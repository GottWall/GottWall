HTTP Backend specification
==========================

Спецификация протокола приема метрик через HTTP.

Общая информация
--------------------

Работа с бэкэндом осуществляется с помощью HTTP запросов, на URL адрес аггрегатора.

URL адрес для отправки данных
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Адрес для отправки данных имеет вид: ``http(s)://{host}:{port}/{prefix}/api/v1/{project_name}/{action}``, где:

- {host} - доменной имя или ip адрес на котором развернут GottWall;
- {port} - порт который слушает HTTP сервер аггрегатора;
- {prefix} - префикс API, который указан в конфигурации сервера GottWall;
- {project_name} - название проекта, в который будут коллекционироваться метрики
  (можно получить в web интерфейсе GottWall);
- {action} - действие:

  * incr/decr - увеличение или уменьшение счетчика
  * avg - средняя величина
  * gauge - абсолютное значение


Authorization
-------------

Каждый пакет данных должне быть подписан авторизационными ключами.
Авторизационные ключи могут быть переданы в заголовках ``X-GottWall-Auth`` или ``Basic``.


X-GottWall-Auth
^^^^^^^^^^^^^^^

Значение авторизационного заголовка имеет следующий формат::

  X-GottWall-Auth: GottWallS1 {timestamp} {hmac_key} {base} {project}

где:

- {timestamp} - unix timestamp в секундах по UTC;
- {hmac_key} результать расчета хэша по формуле::

	solt = int(round(timestamp / base) * base)
	sign_msg = {public_key}{solt}
	hmac(key=private_key, msg=sign_msg, digestmode=md5).hexdigest

- {base} округление временной метки
- {project} название проекта (может сделать хэшем?)

Basic
^^^^^

You need to encode(private_key:public_key) string use Base64.

::
   Authorization: Basic base64(private_key:public_key)


Data format
-----------

Данные метрик передаются POST запросом в формате json::

  {"n": "metric_name", # metric name
   "ts": timestamp, # utc timestamp in seconds
   "v": 2 # value,
   "p": "test", #project name
   "f": {"filter_name1": ["value1", "value2"] # dict of filters
   }}


Clients
-------

- `stati-python-net <http://github.com/GottWall/stati-python-net>`_ for python language.
- `stati-go-net <http://github.com/GottWall/stati-go-net`_ for go language.


We need you help
----------------

Данный раздел документации нуждается в корректировке и переводе.
Если вы хотите помочь, то необходимо сделать форк репозитория и внести правки
в файл документации ``docs/source/backends/http.rst``, а затем создать pull request
в основной репозиторий. Будем благодарны за любой вклад.
