$(function(){
    let gameOver = false;
    let currentPlayer = 'O'; 
    function checkWon(){
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            const cellA = $('.cell').eq(a).text();
            const cellB = $('.cell').eq(b).text();
            const cellC = $('.cell').eq(c).text();
    
            
            if (cellA && cellA === cellB && cellA === cellC) {
                return cellA; 
            }
        }
    
        return null;

    }
    
    $('.cell').click(function () {
        if(gameOver){
            return;
        }
        if ($(this).text() === '') {
            if(currentPlayer === 'X'){
                drawX($(this)[0]);
                $(this).html('X');
            }
            else{
                drawO($(this)[0]);
                $(this).html('O');
            }
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }

        const winner = checkWon()
        if(winner){
            gameOver = true;
            setTimeout(function(){
                alert(`Player ${winner} is winner.`)
            },500);
            

        }
    });

    $('#reset').click(function () {
        gameOver = false;
        const canvases = $('canvas');
        canvases.html('');
        canvases.each(function () {
            const canvas = this; 
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    });
    
    function drawX(ele) {
        var canvas = ele;
        var ctx = canvas.getContext("2d");

        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
    
        var line1Length = 0;
        var line2Length = 0;
        var totalLength = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
        const animationDuration = 100;
        function animateLine1(callback) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo((line1Length / totalLength) * canvas.width, (line1Length / totalLength) * canvas.height);
            ctx.stroke();
    
            line1Length += (totalLength / animationDuration) * 10;
    
            if (line1Length <= totalLength) {
                requestAnimationFrame(function () {
                    animateLine1(callback);
                });
            } else {
                callback();
            }
        }
    
        function animateLine2() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.stroke();
    
            ctx.beginPath();
            ctx.moveTo(canvas.width, 0);
            ctx.lineTo(canvas.width - (line2Length / totalLength) * canvas.width, (line2Length / totalLength) * canvas.height);
            ctx.stroke();
    
            line2Length += (totalLength / animationDuration) * 10;
            if (line2Length <= totalLength) {
                requestAnimationFrame(animateLine2);
            }
        }
        animateLine1(animateLine2);
    }

    function drawO(ele) {
        const canvas = ele;
        const ctx = canvas.getContext('2d');
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 15;
        
        let animationStartTime;
        const animationDuration = 300;
        
        function animate(timestamp) {
            if (!animationStartTime) {
                animationStartTime = timestamp;
            }
            
            const elapsedTime = timestamp - animationStartTime;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const endAngle = (elapsedTime / animationDuration) * (2 * Math.PI);
            
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, endAngle);
            ctx.stroke();
            
            if (elapsedTime < animationDuration) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }  
})