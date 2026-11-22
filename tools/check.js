const fs=require('fs'),path=require('path');const R=path.join(__dirname,'..');
function walk(d){return fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?(['tools','data','img','css','js','node_modules'].includes(e.name)&&d===R?[]:walk(path.join(d,e.name))):[path.join(d,e.name)])}
const pages=walk(R).filter(f=>f.endsWith('.html'));let bad=0,ph=new Set();
for(const f of pages){const h=fs.readFileSync(f,'utf8');
 const h1=(h.match(/<h1[ >]/g)||[]).length;if(h1!==1){console.log('H1',h1,f);bad++}
 for(const m of h.matchAll(/(?:href|src)="([^"#:]+)"/g)){const t=path.resolve(path.dirname(f),m[1]);if(!fs.existsSync(t)){console.log('BROKEN',path.relative(R,f),m[1]);bad++}}
 for(const m of h.matchAll(/\[([^\]]*입력 필요[^\]]*)\]/g))ph.add(m[1]);}
console.log('pages',pages.length,'problems',bad);console.log('placeholders:',[...ph]);
