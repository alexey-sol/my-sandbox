import moment from "moment";

// If "dateString" occurs to be a valid date, returns true. Otherwise returns
// false.

const isValidDate: (dateString: string) => boolean =

  function(dateString: string): boolean {
    return (moment(dateString).isValid()) ? true : false;
  };

export default isValidDate;