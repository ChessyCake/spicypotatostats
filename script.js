window.onload = spicyPotatoStats;

async function spicyPotatoStats() {
         const info = await fetch("https://codeforces.com/api/user.info?handles=vorqX;rust7;snow07;prahlad_kumar-0037");
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



