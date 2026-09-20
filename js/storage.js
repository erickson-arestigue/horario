/* Modelo, validación e intervalos: no dependen de la interfaz. */
(() => {
  'use strict';
  const H = window.Horario;
  H.storageKey = 'mi-horario.v1';
  H.categories = {clase:'Clase universitaria', estadistica:'Estudio de Estadística', estudio:'Estudio', gimnasio:'Gimnasio', proyectos:'Proyectos', comidas:'Comidas', aseo:'Aseo / preparación', transporte:'Transporte', descanso:'Descanso / tiempo libre', personal:'Personal', dormir:'Dormir', planificacion:'Planificación'};
  H.courses = {general:'Otra clase', stats:'Estadística Aplicada', algo:'Algoritmia y Estructuras', operations:'Investigación de Operaciones', requirements:'Ingeniería de Requerimientos', poo:'POO / Lenguaje de Programación', architecture:'Arquitectura de Computadoras II'};
  H.filters = {todo:'TODO',clases:'CLASES',estudio:'ESTUDIO',estadistica:'ESTADÍSTICA',gym:'GYM',proyectos:'PROYECTOS',personal:'PERSONAL'};
  H.clone = value => JSON.parse(JSON.stringify(value));
  H.minute = time => Number(time.slice(0,2))*60 + Number(time.slice(3));
  H.time = n => `${String(Math.floor(n/60)%24).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
  H.duration = e => (H.minute(e.end) - H.minute(e.start) + 1440) % 1440;
  H.format = value => { const n=Math.round(value); return `${Math.floor(n/60)} h${n%60 ? ` ${n%60} min` : ''}`; };
  H.isStats = e => e.category==='estadistica' || (e.category==='clase' && e.course==='stats');
  H.isStudy = e => ['estudio','estadistica'].includes(e.category);
  H.matches = (e,f) => f==='todo' || (f==='clases' ? e.category==='clase' : f==='estudio' ? H.isStudy(e) : f==='estadistica' ? H.isStats(e) : f==='gym' ? e.category==='gimnasio' : f==='proyectos' ? e.category==='proyectos' : !['clase','estadistica','estudio','gimnasio','proyectos'].includes(e.category));
  H.colorKey = e => e.category==='clase' ? (e.course==='general'?'class-algo':'class-'+e.course) : ({estadistica:'study-stats',estudio:'study',gimnasio:'gym',proyectos:'projects',comidas:'food',aseo:'hygiene',transporte:'transport',descanso:'rest',personal:'chores',dormir:'sleep',planificacion:'planning'})[e.category];
  H.initial = () => ({version:1,activeWeek:'normal',settings:{sleepStart:'23:45',sleepEnd:'08:00',filter:'todo'},weeks:[{id:'normal',name:'Normal',events:H.clone(H.defaults)},{id:'examenes',name:'Exámenes',events:H.clone(H.defaults)}]});
  const timeRE=/^(?:[01]\d|2[0-3]):[0-5]\d$/;
  const isObject = x => x && typeof x==='object' && !Array.isArray(x);
  const own = (obj,key) => Object.prototype.hasOwnProperty.call(obj,key);
  const string = (x,max) => typeof x==='string' && x.length<=max;
  H.validateEvent = e => {
    if(!isObject(e)||!string(e.id,100)||!e.id||!string(e.title,160)||!e.title.trim()||!string(e.subtitle,500)||!H.days.includes(e.day)||!timeRE.test(e.start)||!timeRE.test(e.end)||!own(H.categories,e.category)) throw Error('Actividad inválida: revisa nombre, día, horas y categoría.');
    if(H.duration(e)===0) throw Error('Inicio y fin no pueden ser iguales.');
    if(H.minute(e.end)<H.minute(e.start)&&e.end!=='00:00'&&e.category!=='dormir') throw Error('La hora final debe ser posterior al inicio (00:00 significa medianoche). Solo Dormir puede continuar al día siguiente.');
    if(e.category==='clase'&&!own(H.courses,e.course)) throw Error('Selecciona el curso de la clase.');
    return {id:e.id,day:e.day,start:e.start,end:e.end,title:e.title.trim(),subtitle:e.subtitle.trim(),category:e.category,course:e.category==='clase'?e.course:''};
  };
  H.validate = raw => {
    if(!isObject(raw)||raw.version!==1||!Array.isArray(raw.weeks)||raw.weeks.length<1||raw.weeks.length>20||!isObject(raw.settings)) throw Error('El archivo no es un horario compatible (versión 1).');
    const ids=new Set();
    const weeks=raw.weeks.map(w=>{
      if(!isObject(w)||!string(w.id,64)||!/^[a-z0-9_-]+$/.test(w.id)||ids.has(w.id)||!string(w.name,60)||!w.name.trim()||!Array.isArray(w.events)||w.events.length>1000) throw Error('Semana inválida o duplicada.');
      ids.add(w.id); const eventIds=new Set();
      return {id:w.id,name:w.name.trim(),events:w.events.map(e=>{const clean=H.validateEvent(e);if(eventIds.has(clean.id)) throw Error('Hay identificadores de actividad duplicados.');eventIds.add(clean.id);return clean;})};
    });
    if(!ids.has(raw.activeWeek)||!timeRE.test(raw.settings.sleepStart)||!timeRE.test(raw.settings.sleepEnd)||!own(H.filters,raw.settings.filter)||raw.settings.sleepStart===raw.settings.sleepEnd) throw Error('Configuración inválida.');
    return {version:1,activeWeek:raw.activeWeek,settings:{sleepStart:raw.settings.sleepStart,sleepEnd:raw.settings.sleepEnd,filter:raw.settings.filter},weeks};
  };
  H.parse = text => {if(typeof text!=='string'||text.length>2_000_000) throw Error('El archivo supera el límite de 2 MB.'); try {return H.validate(JSON.parse(text));} catch(error){if(error instanceof SyntaxError)throw Error('JSON no válido: comprueba que copiaste el contenido completo.');throw error;}};
  H.load = () => {
    try { const raw=localStorage.getItem(H.storageKey); return {state:raw ? H.parse(raw):H.initial(),error:null}; }
    catch(error) { return {state:H.initial(),error:'No se pudieron leer los datos guardados. No se sobrescribirán hasta que hagas un cambio. Exporta una copia antes de continuar. '+error.message}; }
  };
  H.persist = state => { const clean=H.validate(state);localStorage.setItem(H.storageKey,JSON.stringify(clean)); return clean; };
  // Cada segmento corresponde a un día; el sueño puede cruzar domingo → lunes.
  H.segments = e => {
    const start=H.minute(e.start),end=start+H.duration(e),day=H.days.indexOf(e.day);
    const parts=[{event:e,day,start,end:Math.min(end,1440),continued:false}];
    if(end>1440)parts.push({event:e,day:(day+1)%7,start:0,end:end-1440,continued:true});
    return parts;
  };
  H.conflicts = (event,events) => events.filter(other=>other.id!==event.id&&H.segments(event).some(a=>H.segments(other).some(b=>a.day===b.day&&a.start<b.end&&b.start<a.end)));
  H.unionMinutes = events => {
    let total=0;
    for(let day=0;day<7;day++){
      const segments=events.flatMap(H.segments).filter(s=>s.day===day).sort((a,b)=>a.start-b.start);
      let end=0;for(const s of segments){total+=Math.max(0,s.end-Math.max(end,s.start));end=Math.max(end,s.end);}
    } return total;
  };
  H.summary = events => {
    const sum = predicate => events.filter(predicate).reduce((s,e)=>s+H.duration(e),0);
    const sleep=H.unionMinutes(events.filter(e=>e.category==='dormir'));
    return {classes:sum(e=>e.category==='clase'),study:sum(H.isStudy),statsClass:sum(e=>e.category==='clase'&&H.isStats(e)),statsStudy:sum(e=>e.category==='estadistica'),gym:sum(e=>e.category==='gimnasio'),projects:sum(e=>e.category==='proyectos'),sleep,free:H.unionMinutes(events.filter(e=>e.category==='descanso'))};
  };
  // Distribuir conflictos en columnas, sin que un bloque tape a otro.
  H.layout = segments => {
    const sorted=segments.map(s=>({...s})).sort((a,b)=>a.start-b.start||b.end-a.end);
    let group=[],groupEnd=-1;
    function flush(){const ends=[];group.forEach(s=>{let lane=ends.findIndex(end=>end<=s.start);if(lane<0)lane=ends.length;ends[lane]=s.end;s.lane=lane;});group.forEach(s=>s.lanes=ends.length);group=[];}
    sorted.forEach(s=>{if(s.start>=groupEnd){flush();groupEnd=-1;}group.push(s);groupEnd=Math.max(groupEnd,s.end);});flush();return sorted;
  };
})();
