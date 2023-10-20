export {};
// Khai báo một module ambient
declare global {
    interface String {
      isNullOrEmpty(): boolean;
    }
  }

String.prototype.isNullOrEmpty = function (): boolean {
    return this == null || this.trim() === '' || this.length < 0;
};

export function isNullOrEmpty(input: string): boolean {
    return input == null || input.trim() === '' || input.length < 0;
  }