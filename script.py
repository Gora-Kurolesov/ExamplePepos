import tkinter as tk
from tkinter import messagebox
import random
import string
import os

def generate_password(length):
    """Генерирует пароль заданной длины."""
    if length < 1:
        return ""
    chars = string.ascii_letters + string.digits + "!@#$%^&*"
    return ''.join(random.choice(chars) for _ in range(length))

def check_password_strength(password):
    """Проверяет сложность пароля."""
    if len(password) < 8:
        return "Слабый (меньше 8 символов)"
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(c in "!@#$%^&*" for c in password)
    
    score = sum([has_upper, has_lower, has_digit, has_special])
    if score == 4:
        return "Надёжный"
    elif score >= 2:
        return "Средний"
    else:
        return "Слабый"

def save_password(password):
    """Сохраняет пароль в файл."""
    with open("passwords.txt", "a", encoding="utf-8") as f:
        f.write(f"{password}\n")
    messagebox.showinfo("Сохранено", f"Пароль сохранён в passwords.txt")

def main():
    # Создание окна
    root = tk.Tk()
    root.title("Генератор паролей")
    root.geometry("400x300")

    # Поле для длины
    tk.Label(root, text="Длина пароля:").pack(pady=5)
    length_entry = tk.Entry(root)
    length_entry.pack(pady=5)

    # Кнопка генерации
    def generate():
        try:
            length = int(length_entry.get())
            password = generate_password(length)
            result_label.config(text=password)
            strength = check_password_strength(password)
            strength_label.config(text=f"Сложность: {strength}")
        except ValueError:
            messagebox.showerror("Ошибка", "Введите число!")

    tk.Button(root, text="Сгенерировать", command=generate).pack(pady=10)

    # Результат
    tk.Label(root, text="Сгенерированный пароль:").pack()
    result_label = tk.Label(root, text="", font=("Courier", 12))
    result_label.pack(pady=5)

    # Сложность
    strength_label = tk.Label(root, text="")
    strength_label.pack(pady=5)

    # Кнопка сохранения
    tk.Button(root, text="Сохранить пароль", 
              command=lambda: save_password(result_label.cget("text"))).pack(pady=10)

    root.mainloop()

if __name__ == "__main__":
    main()