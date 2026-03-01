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
    <div
      className="w-80 bg-white rounded-3xl shadow-2xl overflow-hidden"
      onTouchStart={handleMouseDown}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      ref={cardRef}
    >
      {/* Coloured top bar */}
      <div className="h-2 bg-purple-600 w-full" />

      <div className="p-8">
        {/* Icon */}
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-purple-600 text-xl">?</span>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-snug">
          {question}
        </h2>
        <p className="text-sm text-gray-400 mb-6">Swipe to answer</p>

        {/* Swipe hints */}
        {!extraInfoBox && (
          <div className="flex justify-between mt-4">
            <span className="text-red-400 font-semibold text-sm">← No</span>
            <span className="text-green-400 font-semibold text-sm">Yes →</span>
          </div>
        )}

        {/* Extra info box */}
        {extraInfoBox && (
          <div>
            {" "}
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Please provide more detail
            </label>
            <input
              type="text"
              className="border border-gray-200 rounded-xl w-full px-4 py-3 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Type here..."
              onChange={(e) => setExtraInfo(e.target.value)}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
            />
            <button
              onClick={handleConfirm}
              onTouchEnd={(e) => e.stopPropagation()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-xl w-full font-semibold text-sm transition-colors"
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { CardSwipe };
