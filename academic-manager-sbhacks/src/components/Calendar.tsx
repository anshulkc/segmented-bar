import React, { useEffect, useState } from 'react'
import { EventApi, DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  backgroundColor?: string;
  borderColor?: string;
}

const EVENT_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71',
];

// Define time slots
const TIME_SLOTS = [
  { start: 9, end: 11 },   // Morning slot 1
  { start: 11, end: 13 },  // Morning slot 2
  { start: 14, end: 16 },  // Afternoon slot 1
  { start: 16, end: 18 },  // Afternoon slot 2
  { start: 18, end: 20 },  // Evening slot
];

// Get earliest and latest hours from TIME_SLOTS
const EARLIEST_HOUR = Math.min(...TIME_SLOTS.map(slot => slot.start));
const LATEST_HOUR = Math.max(...TIME_SLOTS.map(slot => slot.end));

function truncateTitle(title: string, maxWords: number = 2): string {
  // First remove any numbering and clean up the text
  const cleanTitle = title.replace(/^\d+\.\s*/, '').trim();
  
  // Split into words and get the first 2 meaningful words
  const words = cleanTitle.split(' ')
    .filter(word => word.length > 1); // Filter out single characters
  
  if (words.length <= 2) return cleanTitle;
  return words.slice(0, 2).join(' ') + '...';
}

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch('/api/upload');
        const data = await response.json();
        
        if (data.success && data.photos) {
          // Sort photos by deadline
          const sortedPhotos = data.photos
            .filter((photo: any) => photo.deadline && photo.topics)
            .sort((a: any, b: any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

          const allEvents: Event[] = [];
          const bookedSlots: { [key: string]: Set<number> } = {};

          // Process each photo
          for (const photo of sortedPhotos) {
            const tasks = photo.topics.split('\n').filter(Boolean);
            const deadline = new Date(photo.deadline);
            const colorIndex = sortedPhotos.indexOf(photo) % EVENT_COLORS.length;
            const backgroundColor = EVENT_COLORS[colorIndex];

            // Start from today
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            // Process each task
            for (const task of tasks) {
              let scheduled = false;
              
              // Try each day until deadline
              while (!scheduled && currentDate <= deadline) {
                const dateStr = currentDate.toISOString().split('T')[0];
                
                // Initialize booked slots for this day
                if (!bookedSlots[dateStr]) {
                  bookedSlots[dateStr] = new Set();
                }

                // Try each time slot
                for (let slotIndex = 0; slotIndex < TIME_SLOTS.length; slotIndex++) {
                  if (!bookedSlots[dateStr].has(slotIndex)) {
                    // Schedule the task in this slot
                    const slot = TIME_SLOTS[slotIndex];
                    const startTime = new Date(currentDate);
                    startTime.setHours(slot.start, 0, 0);
                    
                    const endTime = new Date(currentDate);
                    endTime.setHours(slot.end, 0, 0);

                    allEvents.push({
                      id: `${photo._id}-${tasks.indexOf(task)}`,
                      title: truncateTitle(task.replace(/^\d+\.\s*/, '').trim()),
                      start: startTime.toISOString(),
                      end: endTime.toISOString(),
                      allDay: false,
                      backgroundColor,
                      borderColor: backgroundColor,
                    });

                    // Mark slot as booked
                    bookedSlots[dateStr].add(slotIndex);
                    scheduled = true;
                    break;
                  }
                }

                if (!scheduled) {
                  // Move to next day if no slots available
                  currentDate.setDate(currentDate.getDate() + 1);
                }
              }
            }
          }

          setEvents(allEvents);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  if (loading) {
    return <div>Loading calendar...</div>;
  }

  return (
    <div className='demo-app'>
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={events}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          slotMinTime={`${EARLIEST_HOUR}:00:00`}
          slotMaxTime={`${LATEST_HOUR}:00:00`}
          slotDuration="01:00:00"
          businessHours={{
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
            startTime: `${EARLIEST_HOUR}:00`,
            endTime: `${LATEST_HOUR}:00`,
          }}
        />
      </div>
    </div>
  );
}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <div className="text-sm">
      <b>{eventContent.timeText}</b>
      <i className="ml-1 text-xs">{eventContent.event.title}</i>
    </div>
  );
}
