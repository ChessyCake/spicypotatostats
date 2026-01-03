window.onload = loadAll();


const sleep = ms => new Promise(res => setTimeout(res, ms));
async function runAllStreaks() {
  const users = [
    { handle: "vorqx", el: "HarshStreak" },
    { handle: "rust7", el: "RaunakStreak" },
    { handle: "sn0w07", el: "PrathamStreak" },
    { handle: "prahlad_kumar-0037", el: "PrahladStreak" }
  ];

  for (const user of users) {
    await streakCalculate(user.handle, user.el);
    await sleep(2000); 
  }
}




  async function streakCalculate(handle, streakElementId) {
  const START_DATE = new Date('2026-01-01').setHours(0,0,0,0);
  const todayMidnight = new Date().setHours(0,0,0,0);
  const ONE_DAY = 24 * 60 * 60 * 1000;

  const res = await fetch(
    `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`
  );
  const data = await res.json();

  const dateSet = new Set();

  data.result.forEach(e => {
    if (e.verdict === "OK") {
      const d = new Date(e.creationTimeSeconds * 1000)
        .setHours(0,0,0,0);
      dateSet.add(d);
    }
  });

  const days = [...dateSet].filter(d => d >= START_DATE).sort((a,b) => b - a);


  const lastSolved = days[0];
  const gapFromToday = todayMidnight - lastSolved;
  if (gapFromToday > ONE_DAY) {
      document.getElementById(streakElementId).parentElement.style.display = "none";
    return;
  }


  if (days.length === 0) {
  document.getElementById(streakElementId).parentElement.style.display = "none";
  return;
}
  let streak = 1;

  for (let i = 0; i < days.length - 1; i++) {
    if (days[i] - days[i+1] === ONE_DAY) streak++;
    else break;
  }

  console.log(streakElementId);
  console.log(streak);
  if( streak > 1){
  document.getElementById(streakElementId).innerHTML = `<span>${streak}</span>`;
  document.getElementById(streakElementId).parentElement.style.display = "flex";
  }
}
  
      async function loadAll() {
       
        const loader = document.getElementById("loader");
         const container = document.querySelector(".container");
        const footer = document.querySelector("footer");

         loader.style.visibility = "visible";
          container.style.visibility = "hidden";
      footer.style.visibility = "hidden";
        try{
       

      await runAllStreaks();


        await sleep(3000);

         await fetchUserInfo();
        
        } catch (err) {
          loader.innerHTML = "Failed to load!";
        } finally {
           loader.style.visibility = "hidden";
          container.style.visibility = "visible";
          footer.style.visibility = "visible";
           }

    }


const tem = document.getElementById("time");
function displayTime() {
 
    const currentTime = new Date();

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();
    

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;

    document.getElementById('yo').textContent = timeString;
}
displayTime();
setInterval(displayTime, 1000);



async function fetchUserInfo() {
   const info = await fetch("https://codeforces.com/api/user.info?handles=vorqX;rust7;sn0w07;prahlad_kumar-0037");
         const data = await info.json();
         
         const dataArr = data.result;
         const harshData = dataArr[0];
         const raunakData = dataArr[1];
         const prathamData = dataArr[2];
         const prahladData = dataArr[3];
         
        document.getElementById("HarshuserName").innerHTML = `<p> ${harshData.handle} </p>`
        document.getElementById("RaunakuserName").innerHTML = `<p> ${raunakData.handle} </p>`
        document.getElementById("PrathamuserName").innerHTML = `<p> ${prathamData.handle} </p>`
        document.getElementById("PrahladuserName").innerHTML = `<p> ${prahladData.handle} </p>`
         
        document.getElementById("Harshrating").innerHTML = `<p> ${harshData.rating} </p>`
        document.getElementById("Raunakrating").innerHTML = `<p> ${raunakData.rating} </p>`
        document.getElementById("Prathamrating").innerHTML = `<p> ${prathamData.rating} </p>`
        document.getElementById("Prahladrating").innerHTML = `<p> ${prahladData.rating} </p>`

        document.getElementById("Harshpfp").style.backgroundImage = `url(${harshData.avatar})`
        document.getElementById("Raunakpfp").style.backgroundImage = `url(${raunakData.avatar})`
        document.getElementById("Prathampfp").style.backgroundImage = `url(${prathamData.avatar})`
        document.getElementById("Prahladpfp").style.backgroundImage = `url(${prahladData.avatar})`


        const HarshlastOnline = new Date(harshData.lastOnlineTimeSeconds * 1000).toLocaleString("en-IN", {
                   dateStyle: "medium",
                   timeStyle: "short",
                   timeZone: "Asia/Kolkata"
                })
         
        const RaunaklastOnline = new Date(raunakData.lastOnlineTimeSeconds * 1000).toLocaleString("en-IN", {
                   dateStyle: "medium",
                   timeStyle: "short",
                   timeZone: "Asia/Kolkata"
                })
        
        const PrathamlastOnline = new Date(prathamData.lastOnlineTimeSeconds * 1000).toLocaleString("en-IN", {
                   dateStyle: "medium",
                   timeStyle: "short",
                   timeZone: "Asia/Kolkata"
                })
        
        const PrahladlastOnline = new Date(prahladData.lastOnlineTimeSeconds * 1000).toLocaleString("en-IN", {
                   dateStyle: "medium",
                   timeStyle: "short",
                   timeZone: "Asia/Kolkata"
                })        
      
        document.getElementById("Harshlastonline").innerHTML = `<p> ${HarshlastOnline} </p>`
        document.getElementById("Raunaklastonline").innerHTML = `<p> ${RaunaklastOnline} </p>`
        document.getElementById("Prathamlastonline").innerHTML = `<p> ${PrathamlastOnline} </p>`
        document.getElementById("Prahladlastonline").innerHTML = `<p> ${PrahladlastOnline} </p>`

}




