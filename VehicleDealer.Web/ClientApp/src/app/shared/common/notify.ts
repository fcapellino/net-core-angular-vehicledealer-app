declare var $: any;
export abstract class Notify {

    public static showSuccessNotification(errorMessage: string): void {
        $.notify({ message: errorMessage }, { type: 'success', timer: 1000, placement: { from: 'top', align: 'right' } });
    }

    public static showErrorNotification(errorMessage: string): void {
        $.notify({ message: errorMessage }, { type: 'danger', timer: 1000, placement: { from: 'top', align: 'right' } });
    }
}
