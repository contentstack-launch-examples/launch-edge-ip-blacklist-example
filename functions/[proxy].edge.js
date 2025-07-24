export default async function handler(request) {
  // Define your blacklisted IPs
  const blockedIPs = [
    "127.0.0.1",        
    "::1",            
    "192.168.1.100",    
    "10.0.0.50",        
    "172.16.0.10"    
  ]; 

  // Get the client's IP address (as sent by the platform)
  console.log("Headers as array:", Array.from(request.headers.entries()));
  const clientIP = request.headers.get("x-forwarded-for") || "";
  const clientIPList = clientIP.split(",").map(ip => ip.trim()); 

  // Check if any forwarded IP is in the blocked list
  const blocked = clientIPList.some(ip => blockedIPs.includes(ip));
  console.log("Access blocked:", blocked);

  if (blocked) {
    console.log("Access denied - IP is blacklisted");
    return new Response("Forbidden. Your IP has been blacklisted.", { status: 403 });
  }

  // Continue with normal logic if IP is not blocked
  // ... your normal edge function logic here ...
  return fetch(request);
}
