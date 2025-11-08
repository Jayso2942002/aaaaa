 // --- GIFs for each question ---
  const gifs = [
    "https://i.pinimg.com/originals/bd/ee/24/bdee248e53d027102223f17e4c025854.gif", // step1 name, cute waving cat
    "https://media.tenor.com/ZARBViZffU4AAAAM/hd-smirk.gif", // birthday cat party
    "https://memes.memedrop.io/production/P0L52k0D524y/source.gif", // favorite color playful cat
    "https://i.pinimg.com/originals/30/fa/f1/30faf1f0732bec0c7bf4e911ecd364f5.gif", // cooking question cat
    "https://i.pinimg.com/originals/0f/8a/ce/0f8ace4d54eb83fce03954feaafe0cc4.gif", // favorite song / personal
    "https://media.tenor.com/_l_5p1vtSE0AAAAM/chiens-funnyanimals.gif", // “type” question shy cat
    "https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyOWx3b2JmNHU0ZHZtejFpa2cyNXV6M2JraTNodHhleTNmczVtNmdnciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0NwF1dnk7GRz3pK0/200w.gif", // inside joke laughing cat
    "https://i.pinimg.com/originals/92/47/50/9247500311086d77a31655b7ad3137a2.gif"  // final step hearts cat
  ];

  // --- Steps/questions ---
  const steps = [
    { q: "Hi! What should I call you? 😚", type:"text", id:"name", placeholder:"I will call you mine!" },
    { q: "When is your birthday? 🎂", type:"date", id:"birthday" },
    { q: "Which color do you like most? 🌈", type:"text", id:"color", placeholder:"Favorite color..." },
    { q: "If I cook for you, what should I make? 🍝😅", type:"text", id:"food", placeholder:"e.g., spaghetti" },
    { q: "“Would you rather kiss me… on the cheek 😚 or surprise me 😳", type:"text", id:"song", placeholder:"Say mouth or die" },
    { q: "What's your type… 😏", type:"text", id:"type", placeholder:"Describe your type..." },
    { q: "If I whispered something naughty… would you listen or run? 😏🖤", type:"text", id:"memory", placeholder:"Don't kill me first, let me run first.." },
    { q: "Be honest… do you like me even a tiny bit? 😹💘", type:"select", id:"like", options:["Yes 💖","Maybe 😳","No 😅"] }
  ];

  let stepIndex = 0;
  const answers = {};

  const gifImg = document.getElementById('gifImg');
  const questionEl = document.getElementById('question');
  const inputArea = document.getElementById('inputArea');
  const stepIndicator = document.getElementById('stepIndicator');
  const backBtn = document.getElementById('backBtn');
  const nextBtn = document.getElementById('nextBtn');
  const finalArea = document.getElementById('finalArea');
  const finalMessage = document.getElementById('finalMessage');
  const hearts = document.getElementById('hearts');

  function showStep(i, direction="forward"){
    inputArea.classList.remove('fade-in','fade-out');
    questionEl.classList.remove('fade-in','fade-out');
    if(direction === "forward"){ inputArea.classList.add('fade-in'); questionEl.classList.add('fade-in'); }
    else { inputArea.classList.add('fade-out'); questionEl.classList.add('fade-out'); setTimeout(()=> { inputArea.classList.remove('fade-out'); questionEl.classList.remove('fade-out'); }, 260); }

    const step = steps[i];
    gifImg.src = gifs[i];
    gifImg.style.transform = "scale(1)";
    questionEl.textContent = step.q;
    stepIndicator.textContent = `Step ${i+1} / ${steps.length}`;

    inputArea.innerHTML = "";
    if(step.type === "text" || step.type === "date"){
      const inp = document.createElement('input');
      inp.type = step.type;
      inp.id = step.id;
      inp.placeholder = step.placeholder || "";
      if(answers[step.id]) inp.value = answers[step.id];
      inputArea.appendChild(inp);
      setTimeout(()=> inp.focus(), 200);
    } else if(step.type === "select"){
      const sel = document.createElement('select');
      sel.id = step.id;
      (step.options || []).forEach(opt => {
        const o = document.createElement('option');
        o.value = opt;
        o.textContent = opt;
        sel.appendChild(o);
      });
      if(answers[step.id]) sel.value = answers[step.id];
      inputArea.appendChild(sel);
    }

    backBtn.style.visibility = (i === 0) ? "hidden" : "visible";
    nextBtn.textContent = (i === steps.length -1) ? "Submit 💌" : "Next ➜";
  }

  function saveCurrentAndNext(){
    const step = steps[stepIndex];
    const el = document.getElementById(step.id);
    if(!el) return;
    if((step.id === "name" || step.id === "birthday") && !el.value.trim()){
      el.focus();
      el.style.border = "2px solid rgba(255,255,255,0.6)";
      setTimeout(()=> el.style.border = "none", 900);
      return false;
    }
    answers[step.id] = el.value;
    return true;
  }

  nextBtn.addEventListener('click', () => {
    if(stepIndex === steps.length -1){
      if(!saveCurrentAndNext()) return;
      showFinal();
      return;
    }
    if(!saveCurrentAndNext()) return;
    stepIndex++;
    showStep(stepIndex, "forward");
  });

  backBtn.addEventListener('click', () => {
    if(stepIndex === 0) return;
    stepIndex--;
    showStep(stepIndex, "back");
  });

  inputArea.addEventListener('keydown', (e) => { if(e.key==='Enter'){ e.preventDefault(); nextBtn.click(); } });

  function showFinal(){
    document.querySelector('.controls').style.display = 'none';
    document.getElementById('gifWrap').style.display = 'none';
    document.getElementById('question').style.display = 'none';
    inputArea.style.display = 'none';

    const name = answers.name ? answers.name : "you";
    const like = answers.like || "Maybe";
    const food = answers.food || "";
    let line = "";
    if(like.includes("Yes")) line = `Awww ${name} 😍 — You passed the test! You said "Yes" 😏💘<br>Now that I know your secrets So , I will keep that inside of my heart`;
    else if(like.includes("Maybe")) line = `Oh ${name} 😳 — "Maybe"... that sounds like hope! You passed the test with a little mystery 😅💘<br>Let's take a chance?`;
    else line = `${name} 😅 — You chose "No"... That’s okay 😭 I’ll just cry in the corner of my room while telling the sun it’s not as hot as you ☀️😩💔`;

    finalMessage.innerHTML = line + `<div style="font-size:.9rem; opacity:.9; margin-top:8px;">(I promise your answers are safe with me 💌)</div>`;
    finalArea.style.display = "block";
    popHearts(16);
  }

  function popHearts(n){
    const colors = ["#ff7aa2","#ffd1dc","#fff1f2","#ffb3c6"];
    for(let i=0;i<n;i++){
      const h = document.createElement('div');
      h.className = 'heart';
      h.style.left = Math.random()*90 + '%';
      h.style.top = (80 + Math.random()*10) + '%';
      h.style.fontSize = (12 + Math.random()*22) + 'px';
      h.style.color = colors[Math.floor(Math.random()*colors.length)];
      h.textContent = "💖";
      h.style.animationDelay = (Math.random()*1.2) + 's';
      hearts.appendChild(h);
      setTimeout(()=> h.remove(), 4200);
    }
  }

  document.getElementById('restartBtn').addEventListener('click', ()=>{
    stepIndex = 0;
    Object.keys(answers).forEach(k => delete answers[k]);
    document.querySelector('.controls').style.display = 'flex';
    document.getElementById('gifWrap').style.display = 'block';
    document.getElementById('question').style.display = 'block';
    inputArea.style.display = 'block';
    finalArea.style.display = 'none';
    hearts.innerHTML = '';
    showStep(0);
  });

  showStep(0);