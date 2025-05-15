/// <reference types="react-scripts" />

declare module '@emailjs/browser' {
  export function init(publicKey: string): void;
  export function send(
    serviceId: string,
    templateId: string,
    templateParams: Record<string, any>,
    publicKey?: string
  ): Promise<{ text: string }>;
}
