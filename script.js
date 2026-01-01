window.onload = spicyPotatoStats;

async function spicyPotatoStats() {
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


        const STREAK_START = new Date('01/01/2026').toLocaleDateString();
        const today = new Date().toLocaleDateString();

        const harshStreak = await fetch("https://codeforces.com/api/user.status?handle=vorqx&from=1&count=20")
        const harshStreakData = await harshStreak.json();

        const harshStreakUpdate = harshStreakData.result;


        let harshStreakValue = 0;        
        const solvedDays = new Set();
  
        harshStreakUpdate.forEach(e => {
                if(e.verdict === "OK"){
                        const meo = new Date(e.creationTimeSeconds * 1000).toLocaleDateString();
                        solvedDays.add( meo );
                     
                }
        });


       const harshArray = Array.from(solvedDays);
       harshArray.sort( (a,b) => new Date(b) - new Date(a));

       const harshfiltered = harshArray.filter((d) => new Date(d) >= new Date(STREAK_START));


if(Date.parse(today) < Date.parse(STREAK_START)){
    document.getElementById("HarshStreak").parentElement.style.display = "none";
}
else if(harshfiltered.length === 0){
    document.getElementById("HarshStreak").parentElement.style.display = "none";
}
else {
    if(harshfiltered[0] !== today){
        document.getElementById("HarshStreak").parentElement.style.display = "none";
    } 
    else {

        harshStreakValue = 1; 

        for(let i = 0; i < harshfiltered.length - 1; i++){

            let d1 = new Date(harshfiltered[i]);
            let d2 = new Date(harshfiltered[i+1]);

            let harshgapDays = Math.floor(Math.abs(d1 - d2) / (24*60*60*1000));

            if(harshgapDays === 1){
                harshStreakValue++;
            } else {
                break;
            }
        }

        document.getElementById("HarshStreak").innerHTML = `<span>${harshStreakValue}</span>`;
        document.getElementById("HarshStreak").parentElement.style.display = "flex";
    }
}



        const raunakStreak = await fetch("https://codeforces.com/api/user.status?handle=rust7&from=1&count=20")
        const raunakStreakData = await raunakStreak.json();

        const raunakStreakUpdate = raunakStreakData.result;


 
        const raunaksolvedDays = new Set();
  
        raunakStreakUpdate.forEach(e => {
                if(e.verdict === "OK"){
                        const meo = new Date(e.creationTimeSeconds * 1000).toLocaleDateString();
                        raunaksolvedDays.add( meo );
                }
        });

       const raunakArray = Array.from(raunaksolvedDays);
       raunakArray.sort((a,b) => new Date(b) - new Date(a));

    

               const raunakfiltered =  raunakArray.filter( (e) => new Date(e) >= new Date(STREAK_START));
             


let raunakstreak = 0;


if( Date.parse(today) < Date.parse(STREAK_START)){
    document.getElementById("RaunakStreak").parentElement.style.display = "none";
}
else if(raunakfiltered.length === 0){
    document.getElementById("RaunakStreak").parentElement.style.display = "none";
}
else {

  
    if(raunakfiltered[0] !== today){
        document.getElementById("RaunakStreak").parentElement.style.display = "none";
    } 
    else {

        raunakstreak = 1;   

        for(let i = 0; i < raunakfiltered.length - 1; i++){

            let d1 = new Date(raunakfiltered[i]);
            let d2 = new Date(raunakfiltered[i+1]);

            let raunakgapDays = Math.floor(Math.abs(d1 - d2) / (24*60*60*1000));

            if(raunakgapDays === 1){
                raunakstreak++;
            } else {
                break;
            }
        }

        document.getElementById("RaunakStreak").innerHTML = `<span>${raunakstreak}</span>`;
        document.getElementById("RaunakStreak").parentElement.style.display = "flex";
    }
}


                
         const prathamStreak = await fetch("https://codeforces.com/api/user.status?handle=sn0w07&from=1&count=20")
        const prathamStreakData = await prathamStreak.json();

        const prathamStreakUpdate = prathamStreakData.result;

      
        const prathamsolvedDays = new Set();
  
        prathamStreakUpdate.forEach(e => {
                if(e.verdict === "OK"){
                        const meo = new Date(e.creationTimeSeconds * 1000).toLocaleDateString();
                        prathamsolvedDays.add( meo );
                }
        });

       const prathamArray = Array.from(prathamsolvedDays);
       prathamArray.sort((a,b) => new Date(b) - new Date(a));


const prathamfiltered = prathamArray.filter(d => new Date(d) >= new Date(STREAK_START));

      let prathamstreak = 0;

if( Date.parse(today) < Date.parse(STREAK_START)){
    document.getElementById("PrathamStreak").parentElement.style.display = "none";
}
else if(prathamfiltered.length === 0){
    document.getElementById("PrathamStreak").parentElement.style.display = "none";
}
else {

   
    if(prathamfiltered[0] !== today){
        document.getElementById("PrathamStreak").parentElement.style.display = "none";
    } 
    else {

        prathamstreak = 1; 

        for(let i = 0; i < prathamfiltered.length - 1; i++){

            let d1 = new Date(prathamfiltered[i]);
            let d2 = new Date(prathamfiltered[i+1]);

            let prathamgapDays = Math.floor(Math.abs(d1 - d2) / (24*60*60*1000));

            if(prathamgapDays === 1){
                prathamstreak++;
            } else {
                break;
            }
        }

        document.getElementById("PrathamStreak").innerHTML = `<span>${prathamstreak}</span>`;
        document.getElementById("PrathamStreak").parentElement.style.display = "flex";
    }
}


        
                
         const prahladStreak = await fetch("https://codeforces.com/api/user.status?handle=prahlad_kumar-0037&from=1&count=20")
        const prahladStreakData = await prahladStreak.json();

        const prahladStreakUpdate = prahladStreakData.result;


        let prahladStreakValue = 0;        
        const prahladsolvedDays = new Set();
  
        prahladStreakUpdate.forEach(e => {
                if(e.verdict === "OK"){
                        const meo = new Date(e.creationTimeSeconds * 1000).toLocaleDateString();
                        prahladsolvedDays.add( meo );
                }
        });

       const prahladArray = Array.from(prahladsolvedDays);
       prahladArray.sort((a,b) => new Date(b) - new Date(a));

const prahladfiltered = prahladArray.filter(d => new Date(d) >= new Date( STREAK_START ));

if( Date.parse(today) < Date.parse(STREAK_START)){
    document.getElementById("PrahladStreak").parentElement.style.display = "none";
}
else if(prahladfiltered.length === 0){
    document.getElementById("PrahladStreak").parentElement.style.display = "none";
}
else {

 
    if(prahladfiltered[0] !== today){
        document.getElementById("PrahladStreak").parentElement.style.display = "none";
    } 
    else {

        prahladStreakValue = 1;   

        for(let i = 0; i < prahladfiltered.length - 1; i++){

            let d1 = new Date(prahladfiltered[i]);
            let d2 = new Date(prahladfiltered[i+1]);

            let prahladgapDays = Math.floor(Math.abs(d1 - d2) / (24*60*60*1000));

            if(prahladgapDays === 1){
                prahladStreakValue++;
            } else {
                break;
            }
        }

        document.getElementById("PrahladStreak").innerHTML = `<span>${prahladStreakValue}</span>`;
        document.getElementById("PrahladStreak").parentElement.style.display = "flex";
    }
}

       


}



