/* Control de formularios, guardado, transferencias y PWA. Sin dependencias. */
(() => {
  'use strict';
  const H=window.Horario, $=id=>document.getElementById(id);
  const loaded=H.load();H.state=loaded.state;
  let editingId=null,editingWeek=null,storageProblem=Boolean(loaded.error),lastSaved=null;
  try {lastSaved=localStorage.getItem(H.storageKey);}catch(_){}
  function status(message,error=false){$('save-status').textContent=message;$('save-status').classList.toggle('error-status',error);}
  H.commit=(next,message)=>{
    try {
      // Evitar que una pestaña antigua sobrescriba cambios de otra.
      if(localStorage.getItem(H.storageKey)!==lastSaved)throw Error('El horario cambió en otra pestaña. Recarga la página antes de guardar.');
      const clean=H.persist(next);lastSaved=JSON.stringify(clean);H.state=clean;storageProblem=false;status(message+' Guardado en este dispositivo.');return true;
    } catch(error){storageProblem=true;status('No se guardó el cambio. '+error.message,true);return false;}
  };
  function show(id){H.hideTooltip();$(id).showModal();}
  function confirmation(message,label='Confirmar'){
    return new Promise(resolve=>{const dialog=$('confirm-dialog');$('confirm-message').textContent=message;$('confirm-accept').textContent=label;dialog.returnValue='';dialog.addEventListener('close',()=>resolve(dialog.returnValue==='confirm'),{once:true});dialog.showModal();});
  }
  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>$(button.dataset.close).close()));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){H.hideTooltip();closeMenu();}});
  document.addEventListener('scroll',H.hideTooltip,true);window.addEventListener('resize',H.hideTooltip);
  function options(select,entries){for(const [value,label]of entries){const option=H.el('option','',label);option.value=value;select.append(option);}}
  options($('event-day'),H.days.map(day=>[day,day.charAt(0).toUpperCase()+day.slice(1)]));options($('event-category'),Object.entries(H.categories));options($('event-course'),Object.entries(H.courses));
  H.openEditor=id=>{
    editingId=id||null;editingWeek=H.state.activeWeek;
    const event=id?H.currentEvents().find(e=>e.id===id):{title:'',subtitle:'',day:H.days[H.selectedDay],start:'09:00',end:'10:00',category:'estudio',course:'general'};
    $('event-form').reset();for(const field of ['title','subtitle','day','start','end','category','course'])$('event-'+field).value=event[field]|| (field==='course'?'general':'');
    $('event-dialog-title').textContent=id?'Editar actividad':'Nueva actividad';$('editing-week').textContent='Semana '+H.weekName();$('delete-event').hidden=!id;$('event-error').textContent='';updateConflicts();show('event-dialog');$('event-title').focus();
  };
  function draft(){return {id:editingId||'new-draft',title:$('event-title').value,subtitle:$('event-subtitle').value,day:$('event-day').value,start:$('event-start').value,end:$('event-end').value,category:$('event-category').value,course:$('event-course').value};}
  function updateConflicts(){
    $('course-field').hidden=$('event-category').value!=='clase';const warning=$('conflict-warning');warning.replaceChildren();warning.hidden=true;
    const e=draft();if(!e.start||!e.end||H.duration(e)===0)return;
    const conflicts=H.conflicts(e,H.currentEvents());
    if(conflicts.length){warning.hidden=false;warning.append(H.el('strong','','⚠ Esta actividad se superpone con:'));const list=H.el('ul');conflicts.forEach(c=>list.append(H.el('li','',`${c.title} — ${c.day}, ${c.start} a ${c.end}`)));warning.append(list,H.el('p','','Puedes guardarla igualmente; los bloques se mostrarán lado a lado.'));}
  }
  $('event-form').addEventListener('input',updateConflicts);$('event-form').addEventListener('change',updateConflicts);
  $('event-form').addEventListener('submit',e=>{
    e.preventDefault();$('event-error').textContent='';
    try{
      const event=H.validateEvent({...draft(),id:editingId||(globalThis.crypto?.randomUUID?.()||'event-'+Date.now()+'-'+Math.random().toString(36).slice(2))});
      const next=H.clone(H.state),week=next.weeks.find(w=>w.id===editingWeek),index=week.events.findIndex(v=>v.id===event.id);
      if(index<0)week.events.push(event);else week.events[index]=event;
      if(!H.commit(next,'Actividad guardada.'))throw Error('No fue posible guardar. Revisa el aviso de almacenamiento.');
      $('event-dialog').close();H.render();
    }catch(error){$('event-error').textContent=error.message;}
  });
  $('delete-event').addEventListener('click',async()=>{
    if(!await confirmation('¿Eliminar esta actividad de la semana '+H.weekName()+'?','Eliminar'))return;
    const next=H.clone(H.state),week=next.weeks.find(w=>w.id===editingWeek);week.events=week.events.filter(e=>e.id!==editingId);
    if(H.commit(next,'Actividad eliminada.')){$('event-dialog').close();H.render();}else $('event-error').textContent='No se pudo guardar la eliminación.';
  });
  $('week-select').addEventListener('change',()=>{const next=H.clone(H.state);next.activeWeek=$('week-select').value;if(H.commit(next,'Semana seleccionada.'))H.render();else $('week-select').value=H.state.activeWeek;});
  $('previous-day').addEventListener('click',()=>H.selectDay(H.selectedDay-1));$('next-day').addEventListener('click',()=>H.selectDay(H.selectedDay+1));$('today-button').addEventListener('click',()=>H.selectDay((new Date().getDay()+6)%7));
  let touch=null;
  $('mobile-agenda').addEventListener('touchstart',e=>{if(e.touches.length===1)touch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
  $('mobile-agenda').addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;touch=null;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)H.selectDay(H.selectedDay+(dx<0?1:-1));},{passive:true});
  $('mobile-agenda').addEventListener('touchcancel',()=>{touch=null;},{passive:true});
  function closeMenu(){$('options-menu').classList.remove('is-open');$('options-toggle').setAttribute('aria-expanded','false');}
  $('options-toggle').addEventListener('click',()=>{const open=$('options-menu').classList.toggle('is-open');$('options-toggle').setAttribute('aria-expanded',String(open));});
  document.addEventListener('click',e=>{if(!e.target.closest('.app-controls'))closeMenu();});
  const exportJSON=()=>JSON.stringify(H.state,null,2);
  function exportFile(){const blob=new Blob([exportJSON()],{type:'application/json'}),url=URL.createObjectURL(blob),anchor=H.el('a');anchor.href=url;anchor.download='horario.json';document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);status('Se descargó horario.json con todas tus semanas y configuraciones.');}
  function transfer(mode){const copy=mode==='copy';$('transfer-title').textContent=copy?'Copiar datos manualmente':'Pegar datos';$('transfer-json').value=copy?exportJSON():'';$('transfer-json').readOnly=copy;$('transfer-submit').hidden=copy;$('transfer-error').textContent=copy?'No se pudo usar el portapapeles. Selecciona este texto y cópialo manualmente.':'';show('transfer-dialog');$('transfer-json').focus();if(copy)$('transfer-json').select();}
  async function importText(text){const next=H.parse(text);const count=next.weeks.reduce((n,w)=>n+w.events.length,0);if(!await confirmation(`Archivo válido: ${next.weeks.length} semanas y ${count} actividades. ¿Reemplazar todas tus semanas y configuraciones actuales? Exporta primero si quieres conservar una copia.`,'Importar'))return false;if(!H.commit(next,'Horario importado.'))throw Error('No se pudo guardar la importación.');H.render();return true;}
  $('import-file').addEventListener('change',async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>2_000_000)throw Error('El archivo supera el límite de 2 MB.');await importText(await file.text());}catch(error){status('No se importó el horario. '+error.message,true);}finally{e.target.value='';}});
  $('transfer-form').addEventListener('submit',async e=>{e.preventDefault();try{if(await importText($('transfer-json').value))$('transfer-dialog').close();}catch(error){$('transfer-error').textContent=error.message;}});
  function targetText(){const start=$('sleep-start').value,end=$('sleep-end').value;$('sleep-target').textContent=start&&end?`Sueño objetivo: ${H.format(H.duration({start,end}))}`:'';}
  $('settings-form').addEventListener('input',targetText);
  $('settings-form').addEventListener('submit',e=>{e.preventDefault();const next=H.clone(H.state);next.settings.sleepStart=$('sleep-start').value;next.settings.sleepEnd=$('sleep-end').value;if(next.settings.sleepStart===next.settings.sleepEnd){$('settings-error').textContent='Las horas objetivo deben ser diferentes.';return;}if(H.commit(next,'Configuración guardada.')){$('settings-dialog').close();H.renderSummary();}else $('settings-error').textContent='No se pudo guardar la configuración.';});
  document.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',async()=>{
    closeMenu();switch(button.dataset.action){
      case 'new':H.openEditor();break;
      case 'week':$('week-select').focus();break;
      case 'filters':$('filters').classList.toggle('mobile-open');if($('filters').classList.contains('mobile-open'))$('filters').querySelector('button').focus();break;
      case 'export':exportFile();break;
      case 'import':$('import-file').click();break;
      case 'copy':try{await navigator.clipboard.writeText(exportJSON());status('Datos copiados. En el otro dispositivo, usa Pegar datos.');}catch(_){transfer('copy');}break;
      case 'paste':transfer('paste');break;
      case 'restore':if(await confirmation('¿Seguro que quieres restaurar el horario original? Se perderán tus modificaciones. Esto restablece ambas semanas y la configuración.','Restaurar')){if(H.commit(H.initial(),'Horario original restaurado.'))H.render();}break;
      case 'settings':$('sleep-start').value=H.state.settings.sleepStart;$('sleep-end').value=H.state.settings.sleepEnd;$('settings-error').textContent='';targetText();show('settings-dialog');break;
    }
  }));
  window.addEventListener('storage',e=>{if(e.key!==H.storageKey&&e.key!==null)return;status('El horario cambió en otra pestaña. Recarga para ver esos cambios antes de editar.',true);});
  H.renderLegend();H.render();setInterval(H.updateNow,60000);
  if(loaded.error)status(loaded.error,true);
  else if(location.protocol==='file:')status('Modo archivo local. Para instalar y usar offline, abre la versión HTTPS o localhost. El guardado depende del navegador.');
  let installPrompt=null;
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('install-button').hidden=false;});
  $('install-button').addEventListener('click',async()=>{if(installPrompt){await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$('install-button').hidden=true;}});
  window.addEventListener('appinstalled',()=>{$('install-button').hidden=true;status('Aplicación instalada.');});
  if('serviceWorker' in navigator && ['http:','https:'].includes(location.protocol) && window.isSecureContext){
    navigator.serviceWorker.register('./service-worker.js',{scope:'./',updateViaCache:'none'}).then(registration=>{
      const ready=()=>{$('offline-status').textContent='Aplicación lista para abrirse sin conexión en este dispositivo.';};
      navigator.serviceWorker.ready.then(ready);
      const offerUpdate=()=>{if(registration.waiting){$('update-button').hidden=false;status('Hay una actualización disponible. Puedes aplicarla desde Configuración.');}};
      offerUpdate();registration.addEventListener('updatefound',()=>{const worker=registration.installing;if(worker)worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller)offerUpdate();});});
      let applying=false;
      $('update-button').addEventListener('click',async()=>{if(storageProblem){status('Exporta tus datos y resuelve el aviso de guardado antes de actualizar.',true);return;}if(await confirmation('La actualización recargará la aplicación. Tus cambios guardados se conservarán.','Actualizar')){applying=true;registration.waiting?.postMessage({type:'SKIP_WAITING'});}});
      navigator.serviceWorker.addEventListener('controllerchange',()=>{if(applying)location.reload();});
    }).catch(error=>{$('offline-status').textContent='No se pudo activar el modo offline. Comprueba la conexión y vuelve a abrir la página.';console.warn('Service worker:',error);});
  }
})();
