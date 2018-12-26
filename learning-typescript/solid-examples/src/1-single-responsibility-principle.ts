// Single Responsibility Principle.
// One class solves one problem. If the class serves a few purposes, it should
// be split into separate classes.

namespace Db { // let's pretend that it's a real DB
  export const orders = [{
    order: "Order #1",
    createdAt: new Date(2018, 11, 6)
  }, {
    order: "Order #2",
    createdAt: new Date(2018, 11, 16)
  }, {
    order: "Order #3",
    createdAt: new Date(2018, 11, 31)
  }];
}

// A "higher level" class which uses services of specialized "lesser level"
// classes (takes their instances as arguments when instantiating).
class OrdersReport {
  protected repo: OrdersRepository;
  protected formatter: OrdersOutputInterface;

  constructor(repo: OrdersRepository, formatter: OrdersOutputInterface) {
    this.repo = repo; // an instance of OrdersRepository
    this.formatter = formatter; // an instance of HtmlOutput
  }

  public getOrdersInfo(startDate: Date, endDate: Date) {
    const orders = this.repo.getOrdersWithDate(startDate, endDate);
    return this.formatter.output(orders);
  }
}

interface OrdersInterface {
  order: string;
  createdAt: Date;
}

interface OrdersOutputInterface {
  output(orders: OrdersInterface[]): string;
}

// A class responsible for formatting output.
class HtmlOutput implements OrdersOutputInterface {
  public output(orders: OrdersInterface[]): string {
    return `<h1>Orders: ${orders}</h1>`;
  }
}

// A class responsible for extracting data from DB.
class OrdersRepository {
  public getOrdersWithDate(startDate: Date, endDate: Date) {
    return Db.orders.filter(order =>
      order.createdAt >= startDate && order.createdAt <= endDate
    );
  }
}

// Now we can use this in such a way.
const ordersReport = new OrdersReport(
  new OrdersRepository(), 
  new HtmlOutput()
);

const orders = ordersReport.getOrdersInfo(
  new Date(2018, 11, 0), 
  new Date(2018, 11, 20)
);




