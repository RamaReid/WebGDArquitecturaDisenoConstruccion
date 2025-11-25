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
})();
