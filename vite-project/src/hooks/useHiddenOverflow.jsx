export function useHiddenOverflow() {
    function hideOverflow(isModalVisible) {
       if(isModalVisible) {
   
      document.body.style.overflow = "hidden"; // ADD THIS LINE
    document.body.style.height = "100%"
  } else if(!isModalVisible) {
      document.body.style.overflow = "auto"; // ADD THIS LINE
      document.body.style.height = "auto";  // 
  }
    }
   return [hideOverflow]
  }