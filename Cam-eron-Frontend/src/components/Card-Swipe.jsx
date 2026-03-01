import { useRef, useState } from "react";

function CardSwipe({ question, questionId, extraInfoNeeded, onSwipe }) {
  const [extraInfoBox, setExtraInfoBox] = useState(false);
  const [extraInfo, setExtraInfo] = useState("");
  const [pendingDirection, setPendingDirection] = useState(null);

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

    if (Math.abs(dx) > 120) {
      const direction = dx > 0 ? "yes" : "no";

      if (extraInfoNeeded && !extraInfoBox) {
        // store direction, show input, snap card back
        setPendingDirection(direction);
        setExtraInfoBox(true);
        cardRef.current.style.transition = "transform 0.3s ease";
        cardRef.current.style.transform = "translateX(0) rotate(0deg)";
      } else {
        // no extra info needed, just swipe
        cardRef.current.style.transform = `translateX(${dx > 0 ? 1000 : -1000}px)`;
        onSwipe(direction, null);
      }
    } else {
      cardRef.current.style.transition = "transform 0.3s ease";
      cardRef.current.style.transform = "translateX(0) rotate(0deg)";
    }
  };

  const handleConfirm = () => {
    onSwipe(pendingDirection, extraInfo || null);
    setExtraInfoBox(false);
    setExtraInfo("");
    setPendingDirection(null);
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
          {extraInfoBox && (
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Please provide more information
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded w-full px-4 py-3 mb-3"
                placeholder=""
                onChange={(e) => setExtraInfo(e.target.value)}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
              />
              <button
                onClick={handleConfirm}
                onTouchEnd={(e) => e.stopPropagation()}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export { CardSwipe };
