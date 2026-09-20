/**
 * Запускає сайт разом із редактором вмісту.
 *
 *   npm run edit
 *
 * Потім відкрийте http://localhost:4321/keystatic — там тексти сторінок,
 * нотатки й розробки редагуються у звичайних полях, без розмітки.
 * Зміни одразу пишуться у файли проєкту; далі їх треба закомітити
 * й запушити через GitHub Desktop.
 *
 * Окремий скрипт потрібен, бо змінні оточення задають по-різному
 * у Windows, macOS і Linux.
 */
import { spawn } from 'node:child_process';

const child = spawn('npx', ['astro', 'dev'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, KEYSTATIC: 'on' }
});

child.on('exit', (code) => process.exit(code ?? 0));
