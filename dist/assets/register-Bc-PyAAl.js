import{s as a,A as c,a as f,h as n}from"./loadingSpinner-D-kshPRo.js";import{a as d}from"./alertMessage-Dl9VQ_2y.js";import"./index-CWKkjwGO.js";async function l({name:e,email:t,password:o}){a();const s=JSON.stringify({name:e,email:t,password:o});try{const r=await fetch(c,{headers:f(),method:"POST",body:s});if(!r.ok){const i=await r.text();throw new Error("Failed to register: "+i)}return await r.json()}catch(r){throw r.name==="TypeError"?alert("Network error, try again later"):alert(`Registration failed: ${r.message}`),console.error("Registration failed",r),r}finally{n()}}async function m(e){e.preventDefault();const t=document.forms.register,o=new FormData(t),s=Object.fromEntries(o.entries());a();try{await l(s),d("Registered! 1000 credits are given to your account.","./auth/login.html")}catch(r){console.error("Registration failed:",r)}finally{n()}}const g=document.forms.register;g.addEventListener("submit",m);