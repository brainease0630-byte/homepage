document.addEventListener('DOMContentLoaded',function(){
  var b=document.querySelector('.burger'),n=document.querySelector('nav.gnb');
  if(b&&n)b.addEventListener('click',function(){n.classList.toggle('open');b.setAttribute('aria-expanded',n.classList.contains('open'))});
  // symptom picker (main page)
  var box=document.getElementById('symList'),res=document.getElementById('symResult');
  if(box&&res){
    var map=window.SYMPTOM_MAP||{};
    box.addEventListener('change',function(){
      var found={};
      box.querySelectorAll('input:checked').forEach(function(i){(i.dataset.t||'').split(',').forEach(function(t){if(t)found[t]=1})});
      var keys=Object.keys(found);
      if(!keys.length){res.classList.remove('on');return}
      res.innerHTML='<b>선택하신 증상과 관련해 확인해 볼 수 있는 안내입니다.</b><br>'+keys.map(function(k){return '<a class="pill" href="'+map[k].href+'">'+map[k].name+'</a>'}).join('')+'<p class="note" style="margin-top:8px">자가진단이 아니라 상담 참고용입니다. 정확한 판단은 진료로 확인하세요.</p>';
      res.classList.add('on');
    });
  }
});
