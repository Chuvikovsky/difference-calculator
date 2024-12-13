### Hexlet tests and linter status:
[![Actions Status](https://github.com/Chuvikovsky/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Chuvikovsky/frontend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/ac5bc88633fd5caebedd/maintainability)](https://codeclimate.com/github/Chuvikovsky/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/ac5bc88633fd5caebedd/test_coverage)](https://codeclimate.com/github/Chuvikovsky/frontend-project-46/test_coverage)

### Проект Hexlet "Вычислитель отличий"

Программа в терминале для рекурсивного сравнения json и yaml файлов.

### Минимальные системные требования
- node - 20.15+
- npm - 10.8+

### Установка
Скопируйте репозиторий на компьютер:
```bash
git clone git@github.com:Chuvikovsky/frontend-project-46.git
```

Перейдите в папку frontend-project-46
```bash
cd frontend-project-46
```

Установите необходимые зависимости:
```
make install
```

### Запуск программы
Программу можно запустить находясь и папке `frontend-project-46` по команде:
```bash
make gendiff <PATH_TO_FILE_1> <PATH_TO_FILE_2>
```
Программу также можно поставить глобально. Для этого нужно находясь в папке `frontend-project-44` ввести следующие команды:
```bash
make publish
npm link
```
После глобальной установки программа запускается в терминале:
```bash
gendiff <PATH_TO_FILE_1> <PATH_TO_FILE_2>
```

### Справка программы
```bash
$ gendiff -h
Usage: gendiff [options] <file1> <file2>

Compares two configuration files and shows a difference.

Arguments:
  file1                first file to compare
  file2                second file to compare

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command

```


[asciinema with flat json file](https://asciinema.org/a/N4hVylGldcCTFWzpTz4PwQaTg)

[asciinema with flat yaml file](https://asciinema.org/a/2qFqMQeVcFDSLUUcd4XUc5J2F)

[asciinema with nested files](https://asciinema.org/a/7oyT9lyhfe2YXqcupEE0ngGCP)

[asciinema with plain format](https://asciinema.org/a/YUEUfArvDkv3c2f3FnGJ8eJVl)

[asciinema with json format](https://asciinema.org/a/kcEbzSyhEZQxZGSTMBxltPM73)
