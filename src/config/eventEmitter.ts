import { EventEmitter } from 'events'


class EventTracker {
    private static instance: EventTracker;
    private emitter: EventEmitter;

    private constructor() {
        this.emitter = new EventEmitter();
    }

    public static getInstance(): EventTracker {
        if (!EventTracker.instance) {
            EventTracker.instance = new EventTracker();
        }
        return EventTracker.instance;
    }

    public on(eventName: string, listener: (...args: any[]) => void): void {
        this.emitter.on(eventName, listener);
    }

    public emit(eventName: string, ...args: any[]): void {
        this.emitter.emit(eventName, ...args)
    }
}


export default EventTracker.getInstance();