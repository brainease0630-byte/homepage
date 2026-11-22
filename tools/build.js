const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..');
const SITE='https://gangnambrain.com';
const TEL='02-566-5421', TELHREF='tel:025665421';
const NAVER='https://booking.naver.com/booking/13/bizes/1450016', KAKAO='https://pf.kakao.com/_byNxin', YT='https://www.youtube.com/@gangnambrain', BLOG='https://blog.naver.com/minkmd';
const ADDR='서울 강남구 테헤란로51길 7, 수지빌딩 3층';
const MAPQ=encodeURIComponent('서울 강남구 테헤란로51길 7 수지빌딩');
const YTICON='<svg class="yti" viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="5.5" fill="#ff0000"/><path d="M11.2 5.6v8.8L19 10z" fill="#fff"/></svg>';
const NICON='<svg class="bi" viewBox="0 0 20 20" aria-hidden="true"><rect width="20" height="20" rx="4.5" fill="#03c75a"/><path d="M5.6 5h3.1l3.2 4.8V5h2.5v10h-3.1L8.1 10.2V15H5.6z" fill="#fff"/></svg>';
const KICON='<svg class="bi" viewBox="0 0 20 20" aria-hidden="true"><rect width="20" height="20" rx="4.5" fill="#fee500"/><ellipse cx="10" cy="9" rx="6.4" ry="4.9" fill="#3c1e1e"/><path d="M6.6 12.6l-1.1 3.2 3.7-2.2z" fill="#3c1e1e"/></svg>';
const EXT='target="_blank" rel="noopener"';
const D=[].concat(...['headache','dizziness','autonomic','brain'].map(f=>require('../data/'+f+'.js')));

const CATS={
 headache:{name:'두통',slug:'headache'},dizziness:{name:'어지럼증',slug:'dizziness'},
 autonomic:{name:'자율신경실조증',slug:'autonomic'},brainfog:{name:'브레인포그',slug:null},
 focus:{name:'집중력 개선',slug:'focus'},mci:{name:'경도인지장애',slug:'mci'}};
const HUBS={
 headache:{title:'두통 원인·증상·질환별 진료 안내 | 강남뇌편한의원',meta:'두통의 유형(편두통·긴장성·군발·신경통)을 증상 양상으로 구분하고 진료 방향을 안내합니다.',
  h1:'반복되는 두통, 통증의 모양보다 먼저 유형을 확인합니다',
  intro:'욱신거리는 두통, 머리를 조이는 통증, 눈 주위의 극심한 발작, 뒤통수의 찌릿함은 서로 다른 원인에서 시작될 수 있습니다. 강남뇌편한의원은 통증 빈도·지속시간·동반 증상과 약 복용일을 함께 확인합니다.',
  checks:['한 달에 머리가 아픈 날이 늘었습니다.','두통과 구역감 또는 빛·소리 민감성이 있습니다.','목·어깨 긴장과 함께 머리가 조입니다.'],
  cause:'편두통·긴장형두통·군발두통·삼차신경통·후두신경통을 구분하고 약물과용두통의 가능성을 확인합니다.',warn:'갑자기 생긴 생애 최악의 두통, 마비·언어장애 등은 응급 평가가 필요합니다.',
  care:'두통일지와 기존 검사·약 복용을 검토한 뒤 생활관리와 한의학적 보완 진료를 상담합니다. 필요한 급성기·예방 약물치료를 유지하는 것이 중요합니다.'},
 dizziness:{title:'어지럼증 원인·증상·질환별 진료 안내 | 강남뇌편한의원',meta:'어지럼증을 빙빙 도는지, 휘청거리는지, 일어날 때 핑 도는지로 구분하고 진료 방향을 안내합니다.',
  h1:'빙빙 도는지, 휘청거리는지, 일어날 때 핑 도는지',
  intro:'어지럼증은 귀의 전정기관, 혈압 조절, 신경계 및 감각 정보 처리 문제에서 나타날 수 있습니다. 증상이 나타나는 자세와 지속시간, 청력 변화·실신 여부가 원인을 구분하는 단서입니다.',
  checks:['누우면 짧게 빙빙 도는 어지럼이 생깁니다.','귀 먹먹함과 이명이 어지럼과 함께 나타납니다.','일어설 때 눈앞이 캄캄해집니다.','복잡한 공간에서 오래 휘청거립니다.'],
  cause:'이석증, 메니에르병, 기립성저혈압, 미주신경성 실신, PPPD를 증상 패턴에 따라 평가합니다.',warn:'새로운 신경학적 이상·흉통·갑작스러운 청력 저하는 신속한 의학적 평가가 필요합니다.',
  care:'이전 이비인후과·신경과·심혈관 검사 내용을 검토하고 필요한 표준치료와 재활을 우선한 뒤 증상별 보완 관리를 상담합니다.'},
 autonomic:{title:'자율신경실조증 원인·증상·질환별 진료 안내 | 강남뇌편한의원',meta:'두근거림·불면·소화불편 등 자율신경 관련 증상을 구분하고 원인 확인과 진료 방향을 안내합니다.',
  h1:'두근거림·불면·소화불편, 서로 연결되어도 원인은 따로 확인해야 합니다',
  intro:'자율신경은 심박·혈압·소화·땀·체온 조절에 관여합니다. 그러나 불면·불안·피로·위장 증상을 모두 하나의 자율신경실조증으로 설명할 수는 없습니다. 증상의 시작 시기와 동반 질환을 함께 살핍니다.',
  checks:['자다가 자주 깨고 심장이 두근거립니다.','긴장할 때 숨이 막히거나 어지럽습니다.','피로가 오래 지속되고 의욕이 떨어집니다.','속쓰림·복통·배변 변화가 반복됩니다.'],
  cause:'부정맥·갑상선 이상, 수면장애, 우울·불안장애, 위장질환 등 다른 원인을 함께 평가합니다.',warn:'특히 실신·흉통·심한 우울증상은 전문 진료가 먼저입니다.',
  care:'생활리듬과 수면·스트레스·위장 기능을 함께 점검하고 개별적으로 보완 한의학 진료를 상담합니다. 각 질환의 표준치료 및 전문의 협진을 우선합니다.'},
 focus:{title:'집중력 개선 원인·증상·질환별 진료 안내 | 강남뇌편한의원',meta:'초등학생·중학생·수험생의 집중력 저하 원인을 수면·정서·두통·학습환경과 함께 살펴봅니다.',
  h1:'공부 시간이 아니라 집중이 어려운 이유를 확인합니다',
  intro:'초등학생의 산만함, 중학생의 학습피로, 수험생의 머리 멍함은 같은 ‘집중력 저하’라도 원인이 다릅니다. 발달 단계와 수면·정서·두통·학습환경을 함께 살펴야 합니다.',
  checks:['책상 앞에 오래 있어도 집중이 되지 않습니다.','수면 부족과 두통·피로가 함께 있습니다.','학교·시험 일정에 따라 증상이 심해집니다.'],
  cause:'학생과 보호자 의견을 함께 듣고 ADHD·학습장애·수면장애·불안·우울 가능성 등 전문 평가가 필요한 상황을 확인합니다.',warn:'',
  care:'학습시간보다 지속 가능한 수면·휴식·활동 계획을 제안하고 신체 불편에 대한 보완 진료를 상담합니다. 성적 향상이나 합격을 보장하지 않습니다.'},
 mci:{title:'경도인지장애 원인·증상·질환별 진료 안내 | 강남뇌편한의원',meta:'건망증·경도인지장애·치매의 차이를 일상 기능 중심으로 확인하고 진료 방향을 안내합니다.',
  h1:'건망증인지, 경도인지장애인지, 일상 기능부터 확인합니다',
  intro:'기억력 저하는 정상 노화·수면 문제·우울증·경도인지장애·치매 등 여러 원인에서 나타날 수 있습니다. 가족이 관찰하는 변화와 일상생활의 독립성이 중요한 기준입니다.',
  checks:['같은 질문을 반복하는 일이 늘었습니다.','물건과 약속을 자주 잊습니다.','익숙한 일상 업무가 예전보다 어려워졌습니다.'],
  cause:'인지선별검사와 기존 병력, 약물, 청력·수면 상태를 검토하고 필요한 경우 전문 신경인지평가를 권합니다.',warn:'갑자기 생긴 혼돈·의식 변화는 즉시 평가해야 합니다.',
  care:'정확한 진단과 추적관리, 운동·혈관 위험요인·수면 관리 등 근거 기반 접근을 중심으로 보완 진료를 상담합니다. 치매 예방·완치를 보장하지 않습니다.'}
};
// 후기 이미지(분야별)
const REV={headache:['head1','head2','head3','head4'],dizziness:['diz1','diz2','diz3','diz4'],autonomic:['ans1','ans2','ans3','ans4'],brainfog:['fog1','fog2','fog3','fog4'],focus:['fog1','fog2','fog3','fog4'],mci:['mci1','mci2']};
const REVLABEL={headache:'두통',dizziness:'어지럼증',autonomic:'자율신경',brainfog:'브레인포그',focus:'집중력',mci:'인지기능'};

const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const urlOf=d=>d.slug+'/';           // 배포 시 URL
const fileOf=d=>d.slug+'/index.html';
const hubFile=c=>'clinic/'+CATS[c].slug+'/index.html';
const hubFileOrDis=c=>CATS[c].slug?hubFile(c):fileOf(D.find(d=>d.cat===c));
const byName={};D.forEach(d=>byName[d.name]=fileOf(d));
byName['자율신경실조증']=hubFile('autonomic');byName['집중력 개선']=hubFile('focus');
const pre=depth=>'../'.repeat(depth);

function head(title,meta,depth,canon,extra=''){return `<!DOCTYPE html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(meta)}">
<link rel="canonical" href="${SITE}/${canon}">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(meta)}"><meta property="og:image" content="${SITE}/img/consult.jpg">
<link rel="icon" href="${pre(depth)}img/logo.png">
<link rel="stylesheet" href="${pre(depth)}css/style.css">${extra}</head><body>`;}

function header(depth){const p=pre(depth);
 const items=Object.keys(CATS).map(c=>{
  const top=p+hubFileOrDis(c);
  const subs=D.filter(d=>d.cat===c);
  const sub=CATS[c].slug?`<div class="sub">${subs.map(d=>`<a href="${p+fileOf(d)}">${esc(d.name)}</a>`).join('')}</div>`:'';
  return `<li><a href="${top}">${CATS[c].name}</a>${sub}</li>`}).join('');
 return `<header class="site"><div class="wrap hd"><a class="logo" href="${p}index.html"><img src="${p}img/logo.png" alt="강남뇌편한의원 BrainNeuro ease Korean Medicine"></a>
<nav class="gnb" aria-label="주요 메뉴"><ul>${items}<li><a class="btn sm" href="${NAVER}" ${EXT}>${NICON}네이버 예약</a></li><li><a class="btn sm line" href="${KAKAO}" ${EXT}>${KICON}카카오톡 문의</a></li></ul></nav>
<button class="burger" aria-label="메뉴 열기" aria-expanded="false">☰</button></div></header>`;}

function footer(depth){const p=pre(depth);
 const links=Object.keys(CATS).map(c=>`<li><a href="${p+hubFileOrDis(c)}">${CATS[c].name}</a></li>`).join('');
 return `<footer class="site"><div class="wrap cols"><div><div class="logo"><img src="${p}img/logo.png" alt="강남뇌편한의원"></div>
<p>강남뇌편한의원 · 대표원장 박종민<br>${ADDR}<br>선릉역 5번 출구 도보 2분 · 진료 상담·예약 <a href="${TELHREF}">${TEL}</a><br>진료시간 평일 10:00~19:00 (점심 13:00~14:00) · 토 10:00~15:00 · 일·공휴일 휴진</p><p style="margin-top:10px"><a href="${NAVER}" ${EXT}>${NICON}네이버 예약</a> · <a href="${KAKAO}" ${EXT}>${KICON}카카오톡 문의</a> · <a class="ytl" href="${YT}" ${EXT}>${YTICON}유튜브 뇌편한세상</a> · <a href="${BLOG}" ${EXT}>블로그</a></p></div>
<div><h4>진료 분야</h4><ul>${links}</ul></div><div><h4>안내</h4><ul><li><a href="${p}index.html#process">진료 과정</a></li><li><a href="${p}index.html#reviews">치료 후기</a></li><li><a href="${p}index.html#location">오시는 길</a></li></ul></div></div>
<div class="wrap legal">본 사이트의 정보는 일반적인 건강정보이며 개인별 진단·치료를 대체하지 않습니다. 치료 효과와 경과는 개인에 따라 다를 수 있습니다. 응급 증상이 있으면 즉시 응급실 또는 119에 연락하세요.</div></footer>
<a class="btn fab" href="${NAVER}" ${EXT}>${NICON}네이버 예약</a><script src="${p}js/main.js"></script>`;}


const VIEWS=[['한의학','문진·맥진·복진 등 한의학적 진단을 바탕으로 침·약침·한약·추나 등 보완 진료의 적합성을 살핍니다.'],['미국 정골의학','목·척추·근골격계의 구조와 신경 기능의 연결을 함께 보는 관점으로 증상의 배경을 살핍니다.'],['통합의학','뇌파·자율신경·혈관 검사 등 객관적 검사와 기존 병원 진료 내용을 함께 고려해 진료 방향을 세웁니다.']];
const viewsBadge=()=>`<p class="vbadge"><span>한의학</span><i>+</i><span>미국 정골의학</span><i>+</i><span>통합의학</span><em>3가지 관점으로 만성 뇌신경질환·자율신경질환을 진료합니다</em></p>`;
const viewsStrip=()=>`<div class="views">${VIEWS.map(([t,d])=>`<div class="vw"><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>`;
function reviews(cat,depth,n=3,offset=0){
 const p=pre(depth),list=REV[cat];const pick=[];for(let i=0;i<Math.min(n,list.length);i++)pick.push(list[(i+offset)%list.length]);
 return `<div class="rv">${pick.map(k=>`<figure class="photo"><img loading="lazy" src="${p}img/review/${k}.jpg" alt="${REVLABEL[cat]} 진료 환자 후기 화면 캡처"></figure>`).join('')}</div>
<p class="note" style="margin-top:10px">환자분이 직접 작성하신 후기이며, 치료 결과와 경과는 개인마다 다를 수 있어 모든 분께 같은 효과를 보장하지 않습니다.</p>`;}
function faqBlock(faq){return `<div class="faq">${faq.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`;}
function jsonld(faq){return `<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faq.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}))})}</script>`;}
const ctaBand=()=>`<div class="cta-band"><h2>증상이 반복된다면 진료 상담으로 확인해 보세요</h2><p style="font-weight:700">한의학 · 미국 정골의학 · 통합의학, 3가지 관점의 진료</p><p>증상 시작 시기, 반복되는 상황, 이전 검사 결과, 현재 복용약을 알려주시면 도움이 됩니다.</p><div class="cta"><a class="btn lg" href="${NAVER}" ${EXT}>${NICON}네이버 예약</a><a class="btn lg line" href="${KAKAO}" ${EXT}>${KICON}카카오톡 문의</a><a class="btn lg line" href="${TELHREF}">전화 ${TEL}</a></div></div>`;

function write(file,html){const f=path.join(ROOT,file);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,html,'utf8');}

// 질환별 대표 이미지 [파일, 사진(photo)/도식(dia), 설명]
const ILL={
 migraine:['migraine-man','photo','관자놀이를 짚고 통증을 참는 모습'],
 tensionheadache:['office-head','photo','업무 중 머리를 짚는 모습'],
 hormone:['brain-hot','dia','두통을 표현한 일러스트'],
 childhoodheadache:['child-eeg','photo','청소년 뇌파검사 모습'],
 clusterheadache:['brain-spark','dia','극심한 두통을 표현한 일러스트'],
 laryngealneuralgiacervicogenicheadache:['occipital','dia','후두신경 분포를 표현한 일러스트'],
 trigeminalneuralgia:['brain-spark','dia','신경통을 표현한 일러스트'],
 otolithiasisvesibularneuritis:['train','photo','어지러워 고개를 숙인 모습'],
 Menieredisease:['meniere','dia','내이 구조와 메니에르 증상 도식'],
 orthostatichypotension:['platform','photo','승강장에서 어지러워하는 모습'],
 VasovagalSyncope:['vagus-body','dia','미주신경 분포를 표현한 일러스트'],
 pppd:['hearing','photo','귀와 어지럼을 호소하는 모습'],
 insomnia:['insomnia1','photo','잠들지 못하는 모습'],
 'anxiety-panic':['sympathetic','dia','교감신경 항진 증상 도식'],
 'fatigue-low-mood':['insomnia2','photo','지친 모습으로 침대에 앉아 있는 모습'],
 'gastritis-reflux':['gutbrain','dia','장-뇌 축 도식'],
 irritablecolonsyndrome:['gutbrain','dia','장-뇌 축 도식'],
 brainfog:['fog','photo','머리가 멍한 상태를 표현한 일러스트'],
 elementaryschoolchildconcentration:['child-eeg','photo','아이 뇌파검사 모습'],
 middleandhighschoolstudentsconcentration:['fog','photo','집중이 어려운 상태를 표현한 일러스트'],
 examineeAjobseekerconcentration:['office-head','photo','집중이 어려운 모습'],
 forgetfulness:['mci-note','photo','메모를 확인하는 모습'],
 mildcognitiveimpairment:['brain-slice','dia','뇌 단면 이미지'],
 dementiaprevention:['amyloid','dia','치매 관련 뇌 변화를 설명하는 도식']
};
const HUBIMG={headache:['migraine-man','photo'],dizziness:['platform','photo'],autonomic:['insomnia1','photo'],focus:['fog','photo'],mci:['mci-note','photo']};
const EXAMPH={headache:['eeg','뇌파 검사실'],dizziness:['vascular','혈관 스트레스 검사'],autonomic:['ans','자율신경 검사'],brainfog:['eeg','뇌파 검사실'],focus:['eeg','뇌파 검사실'],mci:['eeg','뇌파 검사실']};
const CATIMG={headache:'migraine-man',dizziness:'platform',autonomic:'insomnia1',brainfog:'fog',focus:'child-eeg',mci:'mci-note'};
const CATBLURB={headache:'욱신거림·조임·찌릿함, 통증의 유형부터 구분합니다.',dizziness:'빙빙 도는지, 휘청이는지, 일어날 때 핑 도는지 확인합니다.',autonomic:'두근거림·불면·소화불편의 원인을 따로 확인합니다.',brainfog:'머리가 멍하고 집중이 어려운 이유를 살핍니다.',focus:'초등·중학생·수험생의 집중 저하 원인을 살핍니다.',mci:'건망증·경도인지장애·치매를 일상 기능으로 구분합니다.'};

// ---------- 질환 상세
function disease(d){
 const depth=1,p=pre(depth),hub=CATS[d.cat],siblings=D.filter(x=>x.cat===d.cat);
 const rel=d.related.map(n=>byName[n]?`<a class="pill" href="${p+byName[n]}">${esc(n)}</a>`:'').join('');
 const crumbs=`<div class="crumb"><a href="${p}index.html">홈</a> › ${hub.slug?`<a href="${p+hubFile(d.cat)}">${hub.name}</a>`:hub.name} › ${esc(d.name)}</div>`;
 const [img,kind,alt]=ILL[d.slug];const ex=EXAMPH[d.cat];
 const html=head(d.title,d.meta,depth,urlOf(d),jsonld(d.faq))+header(depth)+`
<main>
<section class="hero page"><div class="wrap"><div class="txt rise">${crumbs}<p class="eyebrow">${hub.name} · 강남 선릉역 강남뇌편한의원</p><h1>${esc(d.h1)}</h1><p class="lead" style="color:var(--mute);font-size:18px;margin-bottom:24px">${esc(d.intro)}</p>
<div class="cta"><a class="btn" href="#check">내 증상 확인</a><a class="btn line" href="#exam">검사·진료 과정</a><a class="btn line" href="${NAVER}" ${EXT}>${NICON}네이버 예약</a></div></div>
<div class="himg ${kind==='dia'?'dia':''} rise d2"><img src="${p}img/ill/${img}.jpg" alt="${esc(alt)}"></div></div></section>
<section class="sec"><div class="wrap layout"><div class="art">
<div class="block" id="check"><h2>이런 증상이 있나요? <small style="font-size:14px;color:var(--mute);font-weight:500">| 1분 체크</small></h2><ul class="checks">${d.checks.map(c=>`<li>${esc(c)}</li>`).join('')}</ul><p class="note" style="margin-top:8px">위 체크리스트는 자가진단이 아니라 진료 상담을 돕기 위한 참고 문항입니다.</p></div>
<div class="block"><h2>어떤 질환인가요? 주요 증상</h2><p>${esc(d.what)}</p></div>
<div class="block"><h2>원인과 악화 요인</h2><p>${esc(d.cause)}</p></div>
<div class="block" id="exam"><h2>검사와 감별이 필요한 경우</h2><p>${esc(d.exam)}</p>
<figure class="photo" style="margin-top:18px"><img loading="lazy" src="${p}img/${ex[0]}.jpg" alt="${ex[1]} 사진" style="aspect-ratio:16/8;object-position:center 40%"><figcaption>원내 ${ex[1]} · 실제 시행 항목은 환자 상태에 따라 선택됩니다.</figcaption></figure></div>
<div class="block"><h2>강남뇌편한의원의 진료 및 치료 방향</h2>${viewsBadge()}<p>${esc(d.care)}</p>
<figure class="photo" style="margin-top:18px"><img loading="lazy" src="${p}img/KSK03970.jpg" alt="박종민 원장이 환자와 상담하는 모습" style="aspect-ratio:16/8;object-position:center 30%"></figure></div>
<div class="block"><h2>생활관리와 경과 확인</h2><p>${esc(d.life)}</p></div>
<div class="block"><h2>${hub.name} 치료 후기</h2>${reviews(d.cat,depth,3,D.indexOf(d))}</div>
<div class="block faq"><h2>자주 묻는 질문 | Q&amp;A</h2>${faqBlock(d.faq)}</div>
<div class="block"><h2>관련 진료 안내</h2>${rel}<p class="note" style="margin-top:10px">진료를 예약할 때에는 증상 시작 시기, 반복되는 상황, 이전 검사 결과, 현재 복용약을 알려주시면 도움이 됩니다.</p></div>
</div>
<aside class="side"><div class="card"><h4>${hub.name} 진료 분야</h4><ul>${siblings.map(s=>`<li><a class="${s===d?'on':''}" href="${p+fileOf(s)}">${esc(s.name)}</a></li>`).join('')}</ul></div>
<div class="card"><h4>진료 상담·예약</h4><p class="note" style="margin-bottom:10px">서울 강남구 선릉역 5번 출구 도보 2분</p><a class="btn sm" href="${NAVER}" ${EXT}>${NICON}네이버 예약</a> <a class="btn sm line" href="${KAKAO}" ${EXT}>${KICON}카카오톡 문의</a><p class="note" style="margin-top:8px">전화 <a href="${TELHREF}">${TEL}</a></p></div></aside></div></section>
${ctaBand()}</main>`+footer(depth)+'</body></html>';
 write(fileOf(d),html);
}

// ---------- 허브
function hub(c){
 const depth=2,p=pre(depth),H=HUBS[c],ds=D.filter(d=>d.cat===c);
 const hi=HUBIMG[c][0];
 const html=head(H.title,H.meta,depth,hubFile(c).replace('index.html',''))+header(depth)+`
<main><section class="hero page"><div class="wrap"><div class="txt rise"><div class="crumb"><a href="${p}index.html">홈</a> › ${CATS[c].name}</div><p class="eyebrow">${CATS[c].name} 클리닉</p><h1>${esc(H.h1)}</h1><p class="lead" style="color:var(--mute);font-size:18px;margin-bottom:24px">${esc(H.intro)}</p>
<div class="cta"><a class="btn" href="#list">질환 선택하기</a><a class="btn line" href="${NAVER}" ${EXT}>${NICON}네이버 예약</a></div></div><div class="himg rise d2"><img src="${p}img/ill/${hi}.jpg" alt="${CATS[c].name} 증상을 겪는 모습"></div></div></section>
<section class="sec alt" style="padding:34px 0"><div class="wrap">${viewsBadge()}${viewsStrip()}</div></section>
<section class="sec"><div class="wrap"><h2>내 증상 확인</h2><ul class="checks" style="margin-top:14px">${H.checks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></section>
<section class="sec" id="list"><div class="wrap"><h2>어떤 질환인지 선택해 보세요</h2><p class="sub-lead">증상 양상에 맞는 안내를 선택하면 원인·감별·진료 방향을 자세히 볼 수 있습니다.</p>
<div class="grid g3">${ds.map(d=>{const [im,k]=ILL[d.slug];return `<a class="icard" href="${p+fileOf(d)}"><div class="im ${k==='dia'?'dia':''}"><img loading="lazy" src="${p}img/ill/${im}.jpg" alt="${esc(d.name)}"></div><div class="bd"><h3>${esc(d.name)}</h3><p>${esc(d.intro.length>78?d.intro.slice(0,78)+'…':d.intro)}</p><span class="more">자세히 보기 →</span></div></a>`}).join('')}</div></div></section>
<section class="sec alt"><div class="wrap split"><div><h2>원인과 감별</h2><p>${esc(H.cause)}</p><h3 style="margin-top:24px">강남뇌편한의원의 진료 방향</h3><p>${esc(H.care)}</p></div>
<figure class="photo" style="box-shadow:var(--sh)"><img loading="lazy" src="${p}img/KSK03962.jpg" alt="박종민 원장과 환자의 진료 상담 장면"></figure></div></section>
<section class="sec"><div class="wrap"><h2>${CATS[c].name} 치료 후기</h2><p class="sub-lead">환자분들께서 직접 남겨주신 후기들입니다.</p>${reviews(c,depth,4)}</div></section>
${ctaBand()}</main>`+footer(depth)+'</body></html>';
 write(hubFile(c),html);
}

// ---------- 메인
function main(){
 const depth=0;
 const syms=[['머리가 욱신거리거나 조이고 두통이 반복됩니다.','headache','migraine-man'],['빙빙 돌거나 걸을 때 휘청거리고, 일어나면 핑 돕니다.','dizziness','platform'],['심장이 두근거리거나 이유 없이 잠에서 자주 깹니다.','autonomic','insomnia2'],['머리가 멍하고 공부·업무 집중이 어렵습니다.','brainfog,focus','fog'],['최근 기억력 변화가 생겨 걱정됩니다.','mci','mci-note']];
 const smap={headache:{name:'두통 클리닉',href:hubFile('headache')},dizziness:{name:'어지럼증 클리닉',href:hubFile('dizziness')},autonomic:{name:'자율신경실조증 클리닉',href:hubFile('autonomic')},brainfog:{name:'브레인포그',href:fileOf(D.find(d=>d.cat==='brainfog'))},focus:{name:'집중력 개선',href:hubFile('focus')},mci:{name:'경도인지장애 클리닉',href:hubFile('mci')}};
 const title='강남 두통·어지럼증·자율신경 진료 | 선릉역 강남뇌편한의원';
 const meta='강남 선릉역 강남뇌편한의원. 두통·어지럼증·불면·자율신경 관련 증상, 브레인포그와 집중력·기억력 저하의 원인과 진료 과정을 안내합니다.';
 const faq=[['MRI가 정상인데도 상담할 수 있나요?','네. 다만 영상검사에서 확인되지 않는 수면·기립성·전정·기능성 문제 등이 있을 수 있어 기존 검사와 증상 패턴을 함께 살펴야 합니다.'],['기존 병원약을 먹고 있어도 되나요?','복용약을 알려주세요. 병행 가능성과 주의사항을 확인하고 처방약의 중단·감량은 원래 처방 의료진과 상의하도록 안내합니다.']];
 const exams=[['eeg','뇌파 검사'],['ans','자율신경 검사'],['thermo','체열진단 검사'],['vascular','혈관 스트레스 검사'],['blood','혈액 검사 장비'],['yakchim','침·약침 진료']];
 const fieldPills=c=>D.filter(d=>d.cat===c).map(d=>`<span>${esc(d.name)}</span>`).join('');
 const html=head(title,meta,depth,'',jsonld(faq)+`<script>window.SYMPTOM_MAP=${JSON.stringify(smap)}</script>`)+header(depth)+`
<main>
<section class="hero"><div class="wrap"><div class="txt rise"><p class="eyebrow">강남 선릉역 · 두통 · 어지럼증 · 자율신경 진료</p>
<h1><span class="nw">반복되는 두통과 어지럼증</span><br><span class="nw">자율신경실조증</span><br><em>원인에 맞는 치료</em>가 핵심입니다</h1>
<p class="lead">두통약을 먹어도 반복되는 머리 통증, 검사에서 특별한 이상이 없다는 어지럼증, 잠을 방해하는 두근거림과 머리 멍함. 비슷해 보이는 증상도 원인은 서로 다를 수 있습니다. 증상이 시작된 상황, 빈도, 기존 검사와 복용약, 생활의 변화를 함께 확인합니다.</p>
${viewsBadge()}
<div class="trust"><div><b>지하철 2호선, 수인분당선 강남 선릉역 5번 출구</b> 2분 거리</div><div><b>정확한 검사와 상담</b>을 통한 원인에 맞는 신뢰할 수 있는 진료</div></div></div>
<div class="heroshot rise d2"><div class="bg"><img src="img/k4215.jpg" alt="강남뇌편한의원 접수 데스크와 대기 공간"></div><img class="doc" src="img/doctor.png" alt="강남뇌편한의원 대표원장 박종민"></div></div></section>

<section class="sec" id="symptom"><div class="wrap"><h2>이런 증상으로 불편하신가요?</h2><p class="sub-lead">해당하는 장면을 선택하면 확인해 볼 진료 분야를 안내해 드립니다.</p>
<div class="sym" id="symList">${syms.map(([t,k,im])=>`<label><input type="checkbox" data-t="${k}" aria-label="${esc(t)}"><div class="im"><img loading="lazy" src="img/ill/${im}.jpg" alt=""></div><span class="t">${esc(t)}</span></label>`).join('')}</div><div id="symResult" role="status"></div></div></section>

<section class="sec alt" id="fields"><div class="wrap"><h2>6대 집중 진료 분야</h2><p class="sub-lead">분야를 선택해 질환별 안내를 확인하세요.</p><div class="grid g3">${Object.keys(CATS).map(c=>`<a class="icard" href="${hubFileOrDis(c)}"><div class="im"><img loading="lazy" src="img/ill/${CATIMG[c]}.jpg" alt="${CATS[c].name}"></div><div class="bd"><h3>${CATS[c].name}</h3><p>${CATBLURB[c]}</p><div class="pills">${fieldPills(c)}</div></div></a>`).join('')}</div></div></section>

<section class="sec" id="views"><div class="wrap split"><div><p class="eyebrow">강남뇌편한의원의 진료 관점</p><h2>한의학 · 미국 정골의학 · 통합의학,<br>3가지 관점으로 살핍니다</h2><p class="sub-lead" style="margin-bottom:22px">두통·어지럼증 같은 만성 뇌신경질환과 두근거림·불면 같은 자율신경질환은 한 가지 시선으로는 원인을 다 설명하기 어렵습니다. 세 가지 관점을 함께 놓고 증상의 배경을 확인하고 진료 방향을 정합니다.</p>${viewsStrip()}<p class="note" style="margin-top:12px">필요한 표준치료는 유지하며, 진료 방법과 경과는 환자 상태에 따라 달라질 수 있습니다.</p></div>
<figure class="photo" style="box-shadow:var(--sh)"><img loading="lazy" src="img/KSK03985.jpg" alt="진료실에서 뇌파 검사 결과를 설명하는 박종민 원장"></figure></div></section>

<section class="sec dark" id="region"><div class="wrap regionbox"><div><p class="eyebrow" style="background:rgba(255,255,255,.12);color:#cfe6ff">내원 환자 500명 기준</p><h2 class="big">전국에서 오는<br>한의원입니다</h2><p class="sub-lead" style="margin-top:14px">강남뇌편한의원은 서울·경기는 물론 인천, 부산, 대구, 제주까지 전국 각지에서 환자분들이 내원하고 계십니다.</p>
<div class="stat"><div style="color:#b9c8d8"><b style="color:#fff">서울 52.6%</b>263명</div><div style="color:#b9c8d8"><b style="color:#fff">경기 27.2%</b>136명</div><div style="color:#b9c8d8"><b style="color:#fff">그 외 20.2%</b>인천·부산·대구 등</div></div>
<p class="note" style="margin-top:14px;color:#9fb3c8">내원 환자 집계기준: 최근 내원 환자 500명 분석</p></div>
<figure class="photo"><img loading="lazy" src="img/patients-region.png" alt="강남뇌편한의원 최근 내원환자 500명 거주지 분포: 서울 52.6%, 경기 27.2%, 인천 4.3%, 부산 3.5%, 기타 지역 12.4%"></figure></div></section>

<section class="sec" id="process"><div class="wrap"><h2>강남뇌편한의원의 진료 과정</h2><p class="sub-lead">증상 확인부터 경과 확인까지 단계별로 진행합니다.</p>
<div class="grid g4 steps"><div class="card"><h3>문진</h3><p>증상 시작 시기·유발 상황·복용약·기존 검사 결과를 확인합니다.</p></div><div class="card"><h3>감별</h3><p>위험 신호와 다른 질환의 가능성을 확인하고 필요한 검사를 안내합니다.</p></div><div class="card"><h3>개별 진료계획</h3><p>질환별 표준치료 및 침·한약·약침·추나 등 적용 가능성과 주의점을 상담합니다.</p></div><div class="card"><h3>경과 확인</h3><p>두통일·어지럼 상황·수면시간·집중력·기억력·생활 기능 변화를 기록합니다.</p></div></div>
<h3 style="margin:42px 0 14px;font-size:22px">원내 검사·진료 장비</h3>
<div class="gal exam">${exams.map(([k,c])=>`<figure class="photo"><img loading="lazy" src="img/${k}.jpg" alt="${c}"><figcaption>${c}</figcaption></figure>`).join('')}</div>
<p class="note" style="margin-top:10px">검사 항목과 장비는 환자 상태에 따라 선택적으로 시행됩니다. 실제 시행 항목은 진료 시 안내해 드립니다.</p></div></section>

<section class="sec alt" id="doctor"><div class="wrap split"><div class="pf"><img loading="lazy" src="img/doctor.png" alt="강남뇌편한의원 대표원장 박종민"></div>
<div><p class="eyebrow">원장 인사말</p><h2>내 병을 치료했듯<br>환자를 포기하지 않는 원장</h2><blockquote class="greet"><p>13살부터 앓던 만성 편두통과 이명,<br>어디를 가도 해결되지 않아 너무도 힘들던 시기가 저에게도 있었습니다.<br>한의대 입학 후 스스로 연구하고 치료하며 마침내 완치에 이르렀습니다.</p><p>제가 겪었던 고통 속에 있는 분들의 마음을 너무 잘 압니다.<br>그 동안 많은 공부와 경험으로 치료 방법을 갖췄습니다만,<br>모든 환자분의 병을 가볍게 보지 않고 세심하게 진료합니다.<br>또, 어떤 경우라도 포기하지 않고 방법을 찾아갑니다.</p><p>고통에서 벗어나는 기쁨을 저는 너무 잘 알고 있습니다.<br>이런 진심을 뒷받침할 실력을 꾸준히 쌓아 가고 있습니다.<br>결국 진심은 병을 이긴다고 믿습니다.</p><footer>- 강남뇌편한의원 박종민 원장 -</footer></blockquote>
<h3 style="margin-top:18px">경력 및 학회 활동</h3><ul class="checks" style="margin-top:8px">${['현 강남 뇌편한의원 대표원장','미국 미시간주립대학 정골의학 상급자 과정 연수','척추신경추나의학회 회원 (수료시험 전국차석)','미국 근골격계 초음파사(ARDMS) 자격증 취득','통합뇌질환학회 회원','대한뇌파한의학회 회원','체형사상의학회 회원','전 심온한방병원 진료과장','전 연합한의원 공동원장','전 민한의원 대표원장','06년도 서울대-연세대-한의대 동시합격','차의과대학교 통합의학 석사과정 중'].map(x=>`<li style="padding-top:9px;padding-bottom:9px">${x}</li>`).join('')}</ul><p class="note" style="margin-top:8px">기존 홈페이지 기재 내용이며, 게시 전 의료진 최종 확인이 필요합니다.</p></div></div></section>

<section class="sec" id="space"><div class="wrap"><h2>진료실과 대기 공간</h2><p class="sub-lead">편안한 분위기에서 충분히 상담하실 수 있도록 마련했습니다.</p>
<div class="gal space"><figure class="photo"><img loading="lazy" src="img/KSK03962.jpg" alt="진료실에서 환자와 상담하는 박종민 원장"></figure><figure class="photo"><img loading="lazy" src="img/k4215.jpg" alt="접수 데스크"></figure><figure class="photo"><img loading="lazy" src="img/k4227.jpg" alt="대기 공간"></figure><figure class="photo"><img loading="lazy" src="img/KSK03970.jpg" alt="진료 상담 장면"></figure><figure class="photo"><img loading="lazy" src="img/k4251.jpg" alt="대기 라운지"></figure></div></div></section>

<section class="sec alt" id="reviews"><div class="wrap"><h2>환자 치료 후기</h2><p class="sub-lead">환자분들께서 직접 남겨주신 후기들입니다.</p>
<div class="rv">${['head1','head2','diz1','diz2','ans2','ans3','fog1','fog3','mci2','head4','diz4','ans4'].map(k=>`<figure class="photo"><img loading="lazy" src="img/review/${k}.jpg" alt="진료 환자 후기 화면 캡처"></figure>`).join('')}</div>
<p class="note" style="margin-top:10px">치료 결과와 경과는 개인마다 다를 수 있으며 모든 분께 같은 효과를 보장하지 않습니다.</p></div></section>

<section class="sec"><div class="wrap"><h2>환자가 자주 묻는 질문</h2><div class="faq" style="margin-top:18px">${faq.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div></div></section>

<section class="sec alt" id="location"><div class="wrap"><h2>진료시간 및 오시는 길</h2><div class="split" style="align-items:start;margin-top:18px"><div>
<p><b>${ADDR}</b><br></p><ul class="hours"><li><b>평일</b> 오전 10:00 ~ 오후 7:00 <small>(점심 13:00 ~ 14:00)</small></li><li><b>토요일</b> 오전 10:00 ~ 오후 3:00 <small>(점심시간 없이 진료)</small></li><li><b>일요일·공휴일</b> 휴진</li></ul>
<ul class="checks" style="margin-top:14px"><li><b>지하철</b> 2호선·수인분당선 선릉역 5번 출구(엘리베이터) 도보 2분(60m). 빅토리아빌딩과 어반벤치빌딩 사이길로 50m 들어오면 왼쪽에 있습니다. 6번 출구에서는 도보 3분(에스컬레이터)</li><li><b>버스</b> 간선 472 / 지선 3426, 4312, 6411 / 마을버스 강남07</li><li><b>주차</b> 건물 내 주차가 어려워 휘닉스오피스텔(테헤란로 323) 주차장(도보 2분)을 이용해 주세요. 주차 1시간 지원</li></ul>
<p style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap"><a class="btn" href="${NAVER}" ${EXT}>${NICON}네이버 예약</a><a class="btn line" href="${KAKAO}" ${EXT}>${KICON}카카오톡 문의</a><a class="btn line yt" href="${YT}" ${EXT}>${YTICON}유튜브 뇌편한세상</a><a class="btn line" href="${TELHREF}">전화 ${TEL}</a></p>
<p class="note" style="margin-top:10px"><a href="https://map.naver.com/p/search/${MAPQ}" ${EXT}>네이버지도에서 보기</a> · <a href="https://map.kakao.com/?q=${MAPQ}" ${EXT}>카카오맵에서 보기</a></p></div>
<div><div class="photo" style="aspect-ratio:4/3"><iframe title="강남뇌편한의원 지도" src="https://maps.google.com/maps?q=${MAPQ}&z=17&output=embed" loading="lazy" style="width:100%;height:100%;border:0"></iframe></div></div></div></div></section>
${ctaBand()}</main>`+footer(depth)+'</body></html>';
 write('index.html',html);
}

D.forEach(disease);Object.keys(HUBS).forEach(hub);main();
// sitemap
const urls=['',...Object.keys(HUBS).map(c=>hubFile(c).replace('index.html','')),...D.map(urlOf)];
write('sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`<url><loc>${SITE}/${u}</loc></url>`).join('\n')}\n</urlset>\n`);
write('robots.txt',`User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log('diseases',D.length,'hubs',Object.keys(HUBS).length,'urls',urls.length);
