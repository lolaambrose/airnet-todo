import React, { useState, useEffect } from 'react';

interface EventModalProps {
   isOpen: boolean;
   onRequestClose: (e: React.MouseEvent) => void;
   event: DayEvent | null;
   onSave: (updatedEvent: DayEvent) => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onRequestClose, event, onSave }) => {
   const [eventData, setEventData] = useState<DayEvent | null>(event);

   useEffect(() => {
      if (event !== eventData) {
         setEventData(event);
      }
   }, [event, eventData]);

   const handleEventChange = (field: string, value: string | boolean) => {
      if (eventData) {
         setEventData({ ...eventData, [field]: value });
      }
   };

   const handleSave = (e: React.MouseEvent) => {
      e.preventDefault();
      if (eventData) {
         const [startHours] = eventData.start.split(':').map(Number);
         const [endHours] = eventData.end.split(':').map(Number);

         if (startHours < 8 || startHours > 23 || endHours < 8 || endHours > 23) {
            alert('Время должно быть в диапазоне с 08:00 до 23:00');
            return;
         }

         if (startHours >= endHours) {
            alert('Время начала должно быть меньше времени конца');
            return;
         }

         onSave(eventData);
      }
      onRequestClose(e);
   };

   const handleModalClick = (e: React.MouseEvent) => {
      e.stopPropagation();
   };

   if (!isOpen || !eventData) return null;

   return (
      <div className={`modal ${isOpen ? 'modal--open' : ''}`} onClick={onRequestClose}>
         <div className="modal__overlay" onClick={onRequestClose}></div>
         <div className="modal__content" onClick={handleModalClick}>
            <div className="modal__body">
               <input
                  type="date"
                  value={eventData.date}
                  onChange={(e) => handleEventChange('date', e.target.value)}
                  className="modal__input"
                  required
               />
               <input
                  type="text"
                  value={eventData.title}
                  onChange={(e) => handleEventChange('title', e.target.value)}
                  placeholder="Название"
                  className="modal__input"
                  required
               />
               <textarea
                  value={eventData.description}
                  onChange={(e) => handleEventChange('description', e.target.value)}
                  placeholder="Описание"
                  className="modal__textarea"
               />
               <div className="modal__footer-color">
                  <select
                     value={eventData.color}
                     onChange={(e) => handleEventChange('color', e.target.value)}
                     className="modal__select"
                  >
                     <option value="pink">розовый</option>
                     <option value="yellow">желтый</option>
                     <option value="blue">голубой</option>
                     <option value="green">зеленый</option>
                  </select>
                  <label className="modal__label">
                     <input
                        type="checkbox"
                        checked={eventData.isCompleted}
                        onChange={(e) => handleEventChange('isCompleted', e.target.checked)}
                        className="modal__checkbox"
                     />
                     Завершено
                  </label>
               </div>
            </div>
            <div className="modal__footer">
               <div className="modal__footer-time">
                  <div>
                     <label htmlFor="time-start" className="modal__footer-label">
                        начало
                     </label>
                     <input
                        id="time-start"
                        type="time"
                        value={eventData.start}
                        onChange={(e) => handleEventChange('start', e.target.value)}
                        className="modal__input"
                     />
                  </div>
                  <div>
                     <label htmlFor="time-end" className="modal__footer-label">
                        конец
                     </label>

                     <input
                        id="time-end"
                        type="time"
                        value={eventData.end}
                        onChange={(e) => handleEventChange('end', e.target.value)}
                        className="modal__input"
                     />
                  </div>
               </div>
               <button onClick={handleSave} className="modal__button modal__button--save">
                  Сохранить
               </button>
               <button onClick={onRequestClose} className="modal__button modal__button--close">
                  Закрыть
               </button>
            </div>
         </div>
      </div>
   );
};

export default EventModal;
