import { useRef, useState } from "react";

function CardSwipe({ question, questionId, extraInfoNeeded, onSwipe }) {
  const [extraInfoBox, setExtraInfoBox] = useState(false);
  const [extraInfo, setExtraInfo] = useState("");

  const handleMouseDown = (e) => {
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.touches[0].clientX;
  };

  const handleMove = (e) => {
    if (!dragRef.current.isDragging) return;
    const dx = e.touches[0].clientX - dragRef.current.startX;

    dragRef.current.currentX = dx;
    cardRef.current.style.transform = `translateX(${dx}px) rotate(${dx * 0.1}deg)`;
  };

  const handleEnd = () => {
    dragRef.current.isDragging = false;
    const dx = dragRef.current.currentX;
    console.log(dx);
    if (Math.abs(dx) > 60) {
      // fly off screen
      const direction = dx > 0 ? "yes" : "no";
      cardRef.current.style.transform = `translateX(${dx > 0 ? 1000 : -1000}px)`;
      console.log(direction);
      if (!extraInfoNeeded || extraInfoBox) {
        onSwipe(direction, extraInfo ? extraInfo : null);
        setExtraInfoBox(false);
      } else if (extraInfoNeeded) {
        setExtraInfoBox(true);
      }
      cardRef.current.style.transform = `translateX(0) rotate(0deg)`;
    } else {
      // snap back
      cardRef.current.style.transition = `transform 0.3s ease`;
      cardRef.current.style.transform = `translateX(0) rotate(0deg)`;
    }
  };

  const dragRef = useRef({ isDragging: false, startX: 0, currentX: 0 });
  const cardRef = useRef(null);

  //   if (extraInfoBox) {
  //     return (
  //       <div>
  //         <label
  //           for="visitors"
  //           class="block mb-2.5 text-sm font-medium text-heading"
  //         >
  //           Please provide more information
  //         </label>
  //         <input
  //           type="text"
  //           id="visitors"
  //           class="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-4 py-3.5 shadow-xs placeholder:text-body"
  //           placeholder=""
  //           required
  //         />
  //       </div>
  //     );
  //   }

  return (
    <>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-2 h-max flex"
        onTouchStart={handleMouseDown}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        ref={cardRef}
      >
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 w-full align-center">
            {question}
          </div>
          {extraInfoNeeded && (
            <div className="text-base ">
              <label
                for="visitors"
                class="block mb-2.5 text-sm font-medium text-heading"
              >
                Please provide more information
              </label>
              <input
                type="text"
                id="visitors"
                class="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-4 py-3.5 shadow-xs placeholder:text-body"
                placeholder=""
                onChange={(e) => setExtraInfo(e.target.value)}
                required
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export { CardSwipe };
