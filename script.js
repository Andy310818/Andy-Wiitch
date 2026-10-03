const nav=document.querySelector("nav");const menu=document.querySelector(".menu-toggle");if(menu&&nav){menu.addEventListener("click",()=>nav.classList.toggle("open"))}
const modal=document.querySelector(".modal");const title=document.querySelector("#modal-title");const text=document.querySelector("#modal-text");const link=document.querySelector("#modal-link");
const guidance={
"survivor-gen":["No gerador","Mantenha o progresso enquanto houver segurança. Observe o ambiente e tenha uma rota de saída antes de continuar. Se a situação ficar perigosa, priorize uma fuga planejada em vez de permanecer parado." ,"sobrevivente.html#gens"],
"survivor-chase":["O Killer está vindo","Não corra sem direção. Procure uma estrutura, janela ou pallet e pense na próxima rota antes de ser alcançado.","sobrevivente.html#chase"],
"survivor-hook":["Seu companheiro está no Hook","Antes de resgatar, observe a posição do Killer e o estado do restante da equipe. Um resgate seguro vale mais do que correr diretamente para o Hook.","sobrevivente.html#resgate"],
"killer-chase":["Você está em Chase","Pense em tempo. Se a perseguição está consumindo muito tempo sem progresso, considere mudar de alvo. Se a rota do Survivor está previsível, tente antecipar a próxima decisão.","killer.html#chase"],
"killer-gen":["Os geradores estão avançando","Não tente defender tudo ao mesmo tempo. Procure uma área onde sua presença consiga criar pressão e escolha perseguições que tenham valor para o mapa.","killer.html#pressao"],
"endgame":["O último gerador terminou","A partida mudou de fase. Reavalie rapidamente posições, portas, companheiros e oportunidades de conversão antes de tomar a próxima decisão.","comece-aqui.html"]
};
function openModal(key){if(!modal||!guidance[key])return;const g=guidance[key];title.textContent=g[0];text.textContent=g[1];link.href=g[2];modal.classList.add("show");modal.setAttribute("aria-hidden","false")}
document.querySelectorAll("[data-open]").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.open)));
document.querySelector(".modal-close")?.addEventListener("click",()=>{modal.classList.remove("show");modal.setAttribute("aria-hidden","true")});
modal?.addEventListener("click",e=>{if(e.target===modal){modal.classList.remove("show");modal.setAttribute("aria-hidden","true")}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal?.classList.contains("show"))modal.classList.remove("show")});

const search=document.querySelector("#dictionary-search");const terms=[...document.querySelectorAll(".term")];const noResults=document.querySelector("#no-results");search?.addEventListener("input",()=>{const q=search.value.toLowerCase().trim();let visible=0;terms.forEach(t=>{const ok=t.dataset.term.includes(q)||t.textContent.toLowerCase().includes(q);t.style.display=ok?"":"none";if(ok)visible++});if(noResults)noResults.hidden=visible!==0});

document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));btn.classList.add("active");const f=btn.dataset.filter;document.querySelectorAll(".build-card").forEach(card=>{card.style.display=f==="all"||card.dataset.type.includes(f)?"":"none"})}));

const quizRoot=document.querySelector("#quiz");if(quizRoot){const qs=[
["Qual é a principal função de um Survivor durante uma partida?","Apenas esconder-se até o final.","Contribuir para os objetivos e sobreviver às ameaças.","Perseguir o Killer pelo mapa.","Impedir todos os outros Survivors de fazer objetivos.",1],
["Durante um Chase, qual é uma boa preocupação para o Survivor?","Correr sem olhar a rota.","Chegar a uma área sem saída.","Planejar a próxima estrutura e ganhar tempo.","Ficar parado esperando o Killer.",2],
["O que é um Loop?","Uma área onde obstáculos podem ser usados para prolongar uma perseguição.","Um tipo de gerador.","Uma forma de cura.","Uma porta de saída.",0],
["Qual é uma preocupação importante para o Killer durante um Chase?","Ignorar o restante do mapa por tempo indefinido.","Pensar no tempo gasto e no valor daquela perseguição.","Nunca trocar de alvo.","Ficar parado no centro do mapa.",1],
["Quando o último gerador termina, o que muda?","A partida termina imediatamente.","Os Survivors perdem todos os controles.","A fase de Endgame começa e as prioridades mudam.","Todos os Hooks desaparecem.",2]
];quizRoot.innerHTML=qs.map((q,i)=>`<article class="quiz-card"><span class="section-kicker">PERGUNTA ${i+1}</span><h3>${q[0]}</h3>${q.slice(1,5).map((o,j)=>`<label class="quiz-option"><input type="radio" name="q${i}" value="${j}"> ${o}</label>`).join("")}</article>`).join("")+`<button class="btn btn-primary quiz-submit" id="quiz-submit">VER RESULTADO →</button>`;
document.querySelector("#quiz-submit").addEventListener("click",()=>{let score=0;qs.forEach((q,i)=>{const a=document.querySelector(`input[name="q${i}"]:checked`);if(a&&Number(a.value)===q[5])score++});const result=document.querySelector("#quiz-result");result.hidden=false;result.textContent=`Você acertou ${score} de ${qs.length}. ${score===5?"Os fundamentos estão bem claros.":"Volte às trilhas e revise os pontos em que ainda ficou em dúvida."}`;result.scrollIntoView({behavior:"smooth",block:"center"})})}
