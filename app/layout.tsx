import { cookies } from "next/headers";

import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "GitHub OAuth example in Next.js"
};

// Temporary: shows what the browser holds during the Base44 native sign-in hand-back.
const debugScript = `(function(){
var log=[];var f=window.fetch;
window.fetch=function(u,o){var p=f.apply(this,arguments);try{var s=String(u&&u.url||u);if(s.indexOf('__b44_handoff')>=0){p.then(function(r){log.push((o&&o.method||'GET')+' '+s.split('/').pop()+' '+r.status)},function(){log.push('ERR '+s.split('/').pop())})}}catch(e){}return p};
function draw(){var el=document.getElementById('b44dbg');if(!el)return;
var ss=[];try{for(var i=0;i<sessionStorage.length;i++)ss.push(sessionStorage.key(i))}catch(e){ss=['ERR']}
var ck=document.cookie?document.cookie.split('; ').map(function(c){var i=c.indexOf('=');return c.slice(0,i)+'='+c.slice(i+1,i+7)}):[];
el.textContent='path '+location.pathname+'\\nserver cookies: '+el.getAttribute('data-server')+'\\njs cookies: '+ck.join(', ')+'\\nsessionStorage: '+ss.join(', ')+'\\nhandoff calls ('+log.length+'): '+log.slice(-5).join(' | ')+'\\nt '+new Date().toISOString().slice(11,19)}
try{document.cookie="dbgp=1; Path=/login/github/callback; Secure; SameSite=None; Partitioned";document.cookie="dbgn=1; Path=/login/github/callback; Secure; SameSite=None";document.cookie="dbgl=1; Path=/login/github/callback; Secure; SameSite=Lax"}catch(e){}
setInterval(draw,500);
})();`;

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const serverCookies = cookies()
		.getAll()
		.map((c) => `${c.name}=${c.value.slice(0, c.name === "dbg_cb" ? 200 : 6)}`)
		.join(", ");
	return (
		<html lang="en">
			<body>
				<script dangerouslySetInnerHTML={{ __html: debugScript }} />
				{children}
				<pre
					id="b44dbg"
					data-server={serverCookies}
					suppressHydrationWarning
					style={{ position: "fixed", left: 0, right: 0, bottom: 90, margin: 0, padding: 8, font: "11px/1.4 monospace", background: "#ffd", whiteSpace: "pre-wrap", wordBreak: "break-all" }}
				/>
			</body>
		</html>
	);
}
