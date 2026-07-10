/* Shared behaviour for the service subpages:
   scroll-reveal, magnetic buttons, and per-service contact form. */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Scroll reveal */
  var els = document.querySelectorAll('.reveal');
  if(reduce || !('IntersectionObserver' in window)){
    els.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold:0.12, rootMargin:'0px 0px -8% 0px' });
    els.forEach(function(el){ io.observe(el); });
  }

  /* Magnetic buttons */
  if(!reduce && window.matchMedia('(pointer:fine)').matches){
    document.querySelectorAll('[data-magnetic]').forEach(function(btn){
      var raf;
      btn.addEventListener('mousemove', function(e){
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width/2) * 0.25;
        var y = (e.clientY - r.top - r.height/2) * 0.35;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function(){ btn.style.transform = 'translate('+x+'px,'+y+'px)'; });
      });
      btn.addEventListener('mouseleave', function(){ cancelAnimationFrame(raf); btn.style.transform=''; });
    });
  }

  /* Per-service contact form: inline success, keeps the "leistung" tag. */
  document.querySelectorAll('form[data-lead-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = form.querySelector('[name="name"]');
      var email = form.querySelector('[name="email"]');
      if(!name.value.trim() || !email.value.trim()){ (name.value.trim()?email:name).focus(); return; }
      var ok = form.querySelector('.form-ok');
      form.querySelectorAll('.field, .btn, .form-note').forEach(function(el){ el.style.display='none'; });
      if(ok) ok.style.display='block';
    });
  });
})();
