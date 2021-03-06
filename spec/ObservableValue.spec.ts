import * as b from 'bobril';
import * as bobx from "../index";

describe("ObservableValue", () => {
    it("construct", () => {
        bobx.observable("Hello");
    });

    it("get set", () => {
        let v = bobx.observable(42);
        expect(v.get()).toBe(42);
        v.set(1);
        expect(v.get()).toBe(1);
    });

    it("invalidates root", () => {
        let invalidated = false;
        let invBackup = b.setInvalidate((ctx?: Object, deepness?: number) => { invalidated = true; invBackup(ctx, deepness); });
        let v = bobx.observable("A");
        b.init(() => {
            return v.get();
        });
        b.syncUpdate();
        invalidated = false;
        v.set("B");
        expect(invalidated).toBeTruthy();
        b.setInvalidate(invBackup);
    });

    it("prop", () => {
        let v = bobx.observable("A");
        let prop = v.prop();
        expect(prop()).toBe("A");
        expect(prop("B")).toBe("B");
        expect(v.get()).toBe("B");
    });
});