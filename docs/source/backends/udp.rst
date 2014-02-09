UDP Backend specification
=========================

Спецификация протокола приема метрик через raw TCP.

Общая информация
--------------------

Взаимодействие с бэкэндом осуществляется с помощью протокола
UDP без установки соединения между сервером и клиентом.


Каждое сообщение состоит из авторизационного загловка и тела запроса.

Authorization header
--------------------

Авторизационный заголовок представляет из себя строку вида::

  GottWallS2 {timestamp} {hmac_key} {base} {project}{stream_auth_delimiter}

где:

- {timestamp} - unix timestamp в секундах по UTC;
- {hmac_key} результать расчета хэша по формуле::

	solt = int(round(timestamp / base) * base)
	sign_msg = {public_key}{solt}
	hmac(key=private_key, msg=sign_msg, digestmode=md5).hexdigest

- {base} округление временной метки
- {project} название проекта (может сделать хэшем?)
- {stream_auth_delimiter} изменяется в настройках бэкэнда агрегатора,
  ``--stream-auth`` по умолчанию. Обозначает завершение авторизационного
  заголовка.

За авторизационным заголовском следуют данные метрик, разделенных с помощью
разделителя ``--chunk--`` (может быть изменен в настройках бэкэнда).

Data format
-----------

Данные метрик передаются формате json::

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
в файл документации ``docs/source/backends/tcp.rst``, а затем создать pull request
в основной репозиторий. Будем благодарны за любой вклад.
