import React, { useEffect, useState } from 'react';
import { EditingState, ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  DragDropProvider,
  EditRecurrenceMenu,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector, useDispatch } from 'react-redux';
import { getSelectHeating, fetchHeatingSchedule, getSelectHeatingSchedule, removeHeatingScheduleItem, saveHeatingScheduleItem } from './heatingSlice';
import { DateTime } from 'luxon';

export const mapHeatingToCalendarSchedule = (heatingSchedule) => heatingSchedule ? heatingSchedule.map((schedule) => ({
  id: schedule.id,
  startDate: schedule.from,
  endDate: schedule.to,
  title: schedule.temperature,
})) : [];

export const mapCalendarToHeatingSchedule = (calendarSchedule) => ({
  id: calendarSchedule.id,
  from: calendarSchedule.startDate,
  to: calendarSchedule.endDate,
  temperature: calendarSchedule.title,
});

export default function HeatingScheduleSingleDay({ heatingId }) {
  const dispatch = useDispatch();
  const heating = useSelector(getSelectHeating(heatingId));

	useEffect(() => {
		if (heating === null) {
			dispatch(fetchHeatingSchedule(heatingId));
		}
  });

  const [ currentDate, setCurrentDate ] = useState(DateTime.local().toISODate());

  const heatingSchedule = useSelector(getSelectHeatingSchedule(heatingId));
  const schedulerData = mapHeatingToCalendarSchedule(heatingSchedule);

  const currentDateChange = (currentDate) => {
    setCurrentDate(currentDate);
  };

  const commitChanges = ({ changed, deleted }) => {
    const dispatchOptionsBase = { heatingId };
    if (changed) {
      const changedEntries = Object.entries(changed);
      changedEntries.forEach(([key, value]) => {
        dispatch(saveHeatingScheduleItem({
          ...dispatchOptionsBase, scheduleItem: mapCalendarToHeatingSchedule({
            id: key,
            ...value,
          })
        }));
      });
    }
    if (deleted !== undefined) {
      dispatch(removeHeatingScheduleItem({ ...dispatchOptionsBase, deletedId: deleted }))
    }
  }

  return (
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        currentDate={currentDate}
        onCurrentDateChange={currentDateChange}
      />
      <EditingState
        onCommitChanges={commitChanges}
        onEditingAppointmentChange={() => {}}
        onAddedAppointmentChange={() => {}}
      />
      <Toolbar />
      <DayView
        startDayHour={0}
        endDayHour={24}
      />
      <DateNavigator />
      <EditRecurrenceMenu />
      <Appointments />
      <AppointmentTooltip showCloseButton showDeleteButton />
      <DragDropProvider />
    </Scheduler>
  );
}
