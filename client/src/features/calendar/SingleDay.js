import React from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  Toolbar,
  DateNavigator,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

export default function SingleDay() {
  const currentDate = '2018-11-01';
  const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
  ];
  const currentDateChange = (currentDate) => {

  };

  return (
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        currentDate={currentDate}
        onCurrentDateChange={currentDateChange}
      />
      <DayView
        startDayHour={0}
        endDayHour={24}
      />
      <Toolbar />
      <DateNavigator />
      <TodayButton />
      <Appointments />
    </Scheduler>
  );
}
