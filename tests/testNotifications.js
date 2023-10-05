// Tests for notification classes

const assert = require('assert');
const { Notification, NotificationArray } = require('../classes/notifications');

describe('Notification', () => {
    before(() => {
        this.notif = new Notification('this is a test!');
    });

    it('should become inactive when make_inactive method is called', () => {
        this.notif.make_inactive();
        assert.equal(this.notif.active, false);
    });

    it('should become active when make_active method is called', () => {
        this.notif.make_active();
        assert.equal(this.notif.active, true);
    });
});

describe('NotificationArray', () => {
    before(() => {
        this.notifArr = new NotificationArray();
    });

    it('should be able to hide notifications', () => {
        this.notifArr.hideNotifications();
        assert.equal(this.notifArr.show, false);
    });

    it('should be able to show notifications', () => {
        this.notifArr.showNotifications();
        assert.equal(this.notifArr.show, true);
    });

    it('should be able to add a notification', () => {
        this.notifArr.add(this.notif);
        assert.equal(this.notifArr.data[0], this.notif);
    });

    it('should be able to remove a notification', () => {
        this.notifArr.remove(this.notif);
        assert.equal(this.notifArr.data.length, 0);
    });
})