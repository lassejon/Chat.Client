import { format, isAfter, subDays } from 'date-fns';

const formatDate = (date: Date): string => {
    const oneWeekAgo = subDays(new Date(), 7);
    if (isAfter(date, oneWeekAgo)) {
        // Date is within the last week
        return format(date, 'EEEE h:mm:ss a');
    } else {
        // Date is more than a week old
        return format(date, 'MMMM do, yyyy h:mm:ss a');
    }
};

export default formatDate;