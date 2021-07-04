const net = require('net');
const port = 7070;
const host = '127.0.0.1';


const server = net.createServer((sock)=>{
    console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);
    
    sock.on('data',function(data){
        console.log(`${sock.remoteAddress}:${sock.remotePort} Says : ${data} `);
        const dataArgs = data.toString().split(" ");

        if (dataArgs.length === 0) { 
            sock.write("ERROR no data");
            return; 
        }

        const command = dataArgs[0]; // gets the command
        if (command === "ADD") { // add command
            if (dataArgs.length !== 3) { // in case there aren't enough arguments
                connection.write("ERROR incorrect number of arguments");
                return;
			}

            const op1 = parseInt(dataArgs[1]); // first number
            const op2 = parseInt(dataArgs[2]); // second number
			const result = (op1 + op2).toString(); // result as a string

            if (result === "NaN") { // in case the inputs aren't numbers
                sock.write("ERROR invalid number");
                return;
            }

			sock.write("RESULT " + result);
			    return; // end
		    } 
            else { // invalid command
                sock.write("ERROR invalid command");
                return;
             }   

        //sock.write(`You Said ${data}`);
    });
   
    sock.on('close',function(){
        console.log(`${sock.remoteAddress}:${sock.remotePort} Terminated the connection`);
    });

    sock.on('error',function(error){
        console.error(`${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`);
    });
});

server.listen(port,host,function(){
   console.log(`Server started on port ${port} at ${host}`); 
});


