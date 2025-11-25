(function(){
  function unmaskAll(){
    var rects = [
      {id:'rectX',   transform: 'translateX(210px)'} ,
      {id:'rectY',   transform: 'translateY(170px)'} ,
      {id:'rectTop', transform: 'translateX(210px)'} ,
      {id:'rectRight',transform: 'translateY(170px)'} ,
      {id:'rectBottom',transform: 'translateX(-210px)'} ,
      {id:'rectLeft', transform: 'translateY(-170px)'}
    ];
    rects.forEach(function(r){
      var el = document.getElementById(r.id);
      if(!el) return;
      el.style.transition = 'transform 350ms ease';
      el.style.transform = r.transform;
    });
    console.log('loader: máscaras forzadas a posición final');
  }

  // Exponer para pruebas manuales en consola: window.loaderUnmaskAll()
  window.loaderUnmaskAll = unmaskAll;

  // Activación silenciosa por tecla 'L'
  window.addEventListener('keydown', function(e){ if(e.key === 'l' || e.key === 'L'){ unmaskAll(); } });

  // Si se añade ?debug=1 en la URL, aplicar al cargar
  try{
    if(window.location && window.location.search && window.location.search.indexOf('debug=1') !== -1){
      window.addEventListener('load', unmaskAll);
    }
  }catch(e){}
  
  /* --- Loop control: restart full sequence 0.3s after the final animation ends --- */
  var _loopEnabled = true;
  var _restartTimer = null;

  var ANIM = {
    rectX:   'revealX 0.7s cubic-bezier(0.55,0.08,0.44,0.99) 0s forwards',
    rectY:   'revealY 0.7s cubic-bezier(0.55,0.08,0.44,0.99) 0.6s forwards',
    rectTop: 'revealLeftToRight 0.4s ease-in-out 1.4s forwards',
    rectRight:'revealTopToBottom 0.4s ease-in-out 1.7s forwards',
    rectBottom:'revealRightToLeft 0.4s ease-in-out 2.0s forwards',
    rectLeft:'revealBottomToTop 0.4s ease-in-out 2.3s forwards',
    str2: 'drawGrey 10s ease-out 2.8s forwards',
    str3: 'drawGinner 1.5s cubic-bezier(0.65,0,0.35,1) 3s forwards',
    str4: 'drawGouter 1.5s cubic-bezier(0.65,0,0.35,1) 3s forwards',
    str5: 'drawD 1.8s cubic-bezier(0.65,0,0.35,1) 4s forwards'
  };

  function applyAnimations(){
    var ids = ['rectX','rectY','rectTop','rectRight','rectBottom','rectLeft'];
    ids.forEach(function(id){
      var el = document.getElementById(id);
      if(!el) return;
      el.style.animation = ANIM[id];
    });

    var map = { 'str2': ANIM.str2, 'str3': ANIM.str3, 'str4': ANIM.str4, 'str5': ANIM.str5 };
    Object.keys(map).forEach(function(cls){
      var els = document.querySelectorAll('.' + cls);
      els.forEach(function(el){ el.style.animation = map[cls]; });
    });
  }

  function clearAnimations(){
    // Clear inline animations to allow reflow restart
    var all = document.querySelectorAll('#rectX,#rectY,#rectTop,#rectRight,#rectBottom,#rectLeft,.str2,.str3,.str4,.str5');
    all.forEach(function(el){ el.style.animation = 'none'; });
    // Force reflow
    void document.body.offsetWidth;
  }

  function restartSequence(){
    if(!_loopEnabled) return;
    clearAnimations();
    // small timeout to ensure browsers register the removal
    setTimeout(function(){ applyAnimations(); }, 20);
  }

  function onFinalAnimationEnd(e){
    // only react to drawD finishing on the stroke (.str5)
    if(e && e.animationName !== 'drawD') return;
    if(_restartTimer) clearTimeout(_restartTimer);

    var svg = document.querySelector('svg');
    // fade out the whole SVG so the end isn't abrupt
    if(svg){
      svg.style.transition = 'opacity 0.6s ease';
      svg.style.opacity = '0';
    }

    // wait until fade completes (listen for transitionend) before restarting the full sequence
    if(svg){
      var fired = false;
      function onFadeEnd(ev){
        if(ev && ev.propertyName && ev.propertyName !== 'opacity') return;
        if(fired) return; fired = true;
        try{ svg.removeEventListener('transitionend', onFadeEnd); }catch(e){}
        if(!_loopEnabled) return;
        clearAnimations();
        svg.style.transition = '';
        svg.style.opacity = '1';
        setTimeout(function(){ applyAnimations(); }, 20);
      }
      svg.addEventListener('transitionend', onFadeEnd);
      // fallback in case transitionend doesn't fire (use 800ms = fade 600ms + small buffer)
      _restartTimer = setTimeout(function(){
        if(fired) return;
        fired = true;
        try{ svg.removeEventListener('transitionend', onFadeEnd); }catch(e){}
        if(!_loopEnabled) return;
        clearAnimations();
        svg.style.transition = '';
        svg.style.opacity = '1';
        setTimeout(function(){ applyAnimations(); }, 20);
      }, 800);
    }else{
      // no svg found, fallback to short timeout
      _restartTimer = setTimeout(function(){ if(!_loopEnabled) return; clearAnimations(); setTimeout(function(){ applyAnimations(); },20); }, 20);
    }
  }

  function startLoop(){
    if(_loopEnabled) return;
    _loopEnabled = true;
    var last = document.querySelector('.str5');
    if(last) last.addEventListener('animationend', onFinalAnimationEnd);
  }

  function stopLoop(){
    _loopEnabled = false;
    if(_restartTimer) { clearTimeout(_restartTimer); _restartTimer = null; }
    var last = document.querySelector('.str5');
    if(last) last.removeEventListener('animationend', onFinalAnimationEnd);
  }

  // Expose control functions for debugging and external control
  window.loaderStartLoop = function(){ startLoop(); }; 
  window.loaderStopLoop  = function(){ stopLoop(); };

  // Attach listener for the first run; when the CSS-run finishes it will schedule the restart
  window.addEventListener('load', function(){
    var last = document.querySelector('.str5');
    if(last) last.addEventListener('animationend', onFinalAnimationEnd);
  });
})();
