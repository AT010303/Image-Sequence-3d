const mouseEvent = () => {
    return addEventListener('mousemove', (e)=>{
        console.log(e.clientX, e.clientY);
        
    });
};

export default mouseEvent;