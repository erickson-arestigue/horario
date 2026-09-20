/* Renderiza la cuadrícula semanal y la agenda móvil con el mismo modelo. */
(() => {
  'use strict';
  const H=window.Horario;
  const $=id=>document.getElementById(id);
  H.el=(tag,className,text)=>{const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;};
  H.color=(node,event)=>{const p=H.palette[H.colorKey(event)];node.style.setProperty('--bg',p[1]);node.style.setProperty('--accent',p[2]);node.style.setProperty('--ink',p[3]);};
  H.currentEvents=()=>H.state.weeks.find(w=>w.id===H.state.activeWeek).events;
  H.weekName=()=>H.state.weeks.find(w=>w.id===H.state.activeWeek).name;
  H.selectedDay=(new Date().getDay()+6)%7;
  H.hideTooltip=()=>{$('tooltip').hidden=true;};
  function tooltip(button,e){
    if(document.querySelector('dialog[open]')||matchMedia('(max-width: 800px)').matches)return;
    const node=$('tooltip');node.replaceChildren(H.el('strong','',e.title),H.el('span','',`${e.day} · ${e.start} – ${e.end}${H.minute(e.end)<H.minute(e.start)&&e.end!=='00:00'?' (+1 día)':''}`),H.el('span','',`${e.subtitle} · ${H.categories[e.category]}`));
    node.hidden=false;const r=button.getBoundingClientRect(),t=node.getBoundingClientRect();node.style.left=`${Math.max(12,Math.min(r.left,innerWidth-t.width-12))}px`;node.style.top=`${Math.max(12,Math.min(r.bottom+6,innerHeight-t.height-12))}px`;
  }
  function eventButton(segment,mobile=false){
    const e=segment.event,length=segment.end-segment.start;
    const button=H.el('button',mobile?'agenda-event':'event');button.type='button';button.dataset.id=e.id;H.color(button,e);
    button.classList.toggle('class-event',e.category==='clase');button.classList.toggle('priority-event',e.category==='estadistica');button.classList.toggle('dimmed',!H.matches(e,H.state.settings.filter));
    if(!mobile){button.style.setProperty('--start',segment.start-H.gridStart);button.style.setProperty('--duration',length);button.style.setProperty('--lane',segment.lane);button.style.setProperty('--lanes',segment.lanes);if(length<=30)button.classList.add('compact');else if(length<=50)button.classList.add('medium');}
    button.append(H.el('strong','',`${e.category==='estadistica'?'📊 ':''}${e.title}`));
    if(mobile||length>30)button.append(H.el('span','event-time',`${e.start} – ${e.end}${segment.continued?' · continúa del día anterior':H.minute(e.end)<H.minute(e.start)&&e.end!=='00:00'?' · día siguiente':''}`));
    if(mobile||length>=60)button.append(H.el('span','event-type',e.subtitle||H.categories[e.category]));
    if(e.category==='estadistica'&&(mobile||length>=60))button.append(H.el('span','priority-badge','PRIORIDAD'));
    button.setAttribute('aria-label',`Editar ${e.title}, ${e.day}, ${e.start} a ${e.end}, ${H.categories[e.category]}`);
    button.addEventListener('click',()=>{H.hideTooltip();H.openEditor(e.id);});
    button.addEventListener('mouseenter',()=>tooltip(button,e));button.addEventListener('mouseleave',H.hideTooltip);button.addEventListener('focus',()=>tooltip(button,e));button.addEventListener('blur',H.hideTooltip);
    return button;
  }
  H.renderCalendar=()=>{
    H.hideTooltip();const events=H.currentEvents();
    const all=events.flatMap(H.segments);
    // Mantener 06:00 como inicio habitual; ampliar si hay actividades tempranas.
    H.gridStart=Math.floor(Math.min(360,...all.filter(s=>s.event.category!=='dormir').map(s=>s.start))/60)*60;
    document.querySelector('.calendar-body').style.height=`calc(var(--hour-height) * ${(1440-H.gridStart)/60})`;
    document.querySelector('.time-range').textContent=`${H.time(H.gridStart)} — 00:00`;
    const header=$('day-headers');header.replaceChildren(H.el('div','axis-header','HORA'));$('days').replaceChildren();$('time-axis').replaceChildren();$('bedtimes').replaceChildren();
    H.days.forEach((day,index)=>{
      const heading=H.el('div','day-heading');heading.append(H.el('span','',H.dayLabels[index]),H.el('small','',day));header.append(heading);
      const column=H.el('div',`day-column${index>4?' weekend':''}`);column.dataset.day=index;column.setAttribute('aria-label',day);$('days').append(column);
      const visible=all.filter(s=>s.day===index&&s.end>H.gridStart).map(s=>({...s,start:Math.max(s.start,H.gridStart)}));
      H.layout(visible).forEach(segment=>column.append(eventButton(segment)));
      const sleeping=events.find(e=>e.category==='dormir'&&e.day===day&&H.minute(e.start)>=1080);
      $('bedtimes').append(H.el('span','bedtime',sleeping?'☾ '+sleeping.start:''));
    });
    for(let hour=H.gridStart/60;hour<24;hour++){const label=H.el('span','hour-label',H.time(hour*60));label.style.setProperty('--minute',hour*60-H.gridStart);$('time-axis').append(label);}
    H.renderMobile();H.renderSummary();H.updateNow();
  };
  H.renderMobile=()=>{
    $('selected-day').textContent=H.days[H.selectedDay];
    $('mobile-tabs').replaceChildren();H.days.forEach((day,i)=>{const button=H.el('button','day-tab',H.dayLabels[i]);button.type='button';button.setAttribute('aria-label',day);button.setAttribute('aria-pressed',String(i===H.selectedDay));button.addEventListener('click',()=>H.selectDay(i));$('mobile-tabs').append(button);});
    const agenda=$('mobile-agenda');agenda.replaceChildren();
    const segments=H.currentEvents().flatMap(H.segments).filter(s=>s.day===H.selectedDay).sort((a,b)=>a.start-b.start);
    segments.forEach(s=>{const row=H.el('div','agenda-row');row.dataset.start=s.start;row.dataset.end=s.end;row.append(H.el('span','agenda-time',H.time(s.start)),eventButton(s,true));agenda.append(row);});
    if(!segments.length)agenda.append(H.el('p','empty-day','Un día por escribir. Añade tu primera actividad.'));
    H.updateNow();
  };
  H.selectDay=day=>{H.selectedDay=(day+7)%7;H.renderMobile();};
  H.renderSummary=()=>{
    const totals=H.summary(H.currentEvents());$('summary-week').textContent=`Semana ${H.weekName()}`;
    const cards=[['🎓','Clases',totals.classes,'Clases programadas'],['📚','Estudio',totals.study,'Incluye Estadística y repasos'],['📊','Estadística',totals.statsClass+totals.statsStudy,'Clases + estudio individual'],['🏋','Gimnasio',totals.gym,'Movimiento y bienestar'],['🚀','Proyectos',totals.projects,'Tiempo para crear'],['☾','Sueño programado',totals.sleep,`Promedio diario: ${H.format(totals.sleep/7)}`],['🕒','Tiempo libre',totals.free,'Bloques de descanso / tiempo libre']];
    $('stats').replaceChildren();cards.forEach(([icon,label,value,note])=>{const card=H.el('article','stat');card.append(H.el('div','stat-label',`${icon} ${label}`),H.el('strong','stat-value',H.format(value)),H.el('small','',note));$('stats').append(card);});
    const title=H.el('div','priority-title');title.append(H.el('p','eyebrow','🔥 PRIORIDAD ACTUAL'),H.el('h3','','ESTADÍSTICA APLICADA'));
    const numbers=H.el('div','priority-numbers');[[totals.statsClass,'Clase'],[totals.statsStudy,'Estudio'],[totals.statsClass+totals.statsStudy,'TOTAL']].forEach(([n,label])=>{const item=H.el('div','priority-number');item.append(H.el('strong','',H.format(n)),H.el('small','',label));numbers.append(item);});$('priority').replaceChildren(title,numbers);
    const target=H.duration({start:H.state.settings.sleepStart,end:H.state.settings.sleepEnd});
    $('sleep-note').textContent=`Sueño objetivo: ${H.format(target)} (${H.state.settings.sleepStart}–${H.state.settings.sleepEnd}). Es solo una referencia. Sueño programado y tiempo libre se calculan de sus bloques, sin duplicar solapamientos; los huecos vacíos no cuentan. El resto de categorías suma la duración de cada actividad. El sueño anterior a ${H.time(H.gridStart)} se incluye en el resumen y se ve completo en la agenda móvil.`;
  };
  H.updateNow=()=>{
    const now=new Date(),day=(now.getDay()+6)%7,minutes=now.getHours()*60+now.getMinutes(),label=H.time(minutes);
    $('clock').textContent=label;
    document.querySelectorAll('.now-line,.agenda-now').forEach(node=>node.remove());
    document.querySelectorAll('.day-heading').forEach((heading,i)=>{heading.classList.toggle('today',i===day);heading.querySelector('small').textContent=i===day?'HOY':H.days[i];});
    if(minutes>=H.gridStart){const column=document.querySelector(`.day-column[data-day="${day}"]`);if(column){const line=H.el('div','now-line');line.style.setProperty('--minute',minutes-H.gridStart);line.append(H.el('span','now-dot'),H.el('span','now-label',label));column.append(line);}}
    if(H.selectedDay===day){
      const marker=H.el('div','agenda-now',`Ahora · ${label}`);const agenda=$('mobile-agenda');const row=[...agenda.querySelectorAll('.agenda-row')].find(r=>Number(r.dataset.end)>minutes);agenda.insertBefore(marker,row||null);
      agenda.querySelectorAll('.agenda-row').forEach(r=>r.classList.toggle('in-progress',Number(r.dataset.start)<=minutes&&Number(r.dataset.end)>minutes));
    }else document.querySelectorAll('.agenda-row.in-progress').forEach(r=>r.classList.remove('in-progress'));
  };
  H.renderFilters=()=>{
    const nav=$('filters');nav.replaceChildren();Object.entries(H.filters).forEach(([key,label])=>{const button=H.el('button','filter',label);button.type='button';button.setAttribute('aria-pressed',String(key===H.state.settings.filter));button.addEventListener('click',()=>{const next=H.clone(H.state);next.settings.filter=key;if(H.commit(next,'Filtro actualizado.')){H.renderFilters();H.renderCalendar();}});nav.append(button);});
  };
  H.render=()=>{
    $('week-select').replaceChildren();H.state.weeks.forEach(w=>{const option=H.el('option','',w.name);option.value=w.id;$('week-select').append(option);});$('week-select').value=H.state.activeWeek;H.renderFilters();H.renderCalendar();
  };
  H.renderLegend=()=>{const node=$('legend');node.replaceChildren();Object.entries(H.palette).forEach(([key,p])=>{const item=H.el('span','legend-item');const swatch=H.el('i','swatch');swatch.style.setProperty('--bg',p[1]);swatch.style.setProperty('--accent',p[2]);item.append(swatch,document.createTextNode(p[0]));node.append(item);});};
})();
