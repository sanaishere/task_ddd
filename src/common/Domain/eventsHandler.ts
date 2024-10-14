export class EventHandler {
 public events:any[] =[]

 addToEvents<T>(event:T) {
  this.events.push(event)
 }
 getEvents() {
    return this.events
 }
}