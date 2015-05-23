## Описание

Плагин для реализации всплывающих диалогов, сообщений и т.п. с красивыми анимациями появления на CSS3, и с минимальным количеством javascript и css кода. Идея взята из этой статьи. В отличие от оригинала, оставлены только 2D эффекты и устранено "замыливание" в webkit-бразерах.

Является основой для всплывающих диалогов [$.dialog](https://github.com/Konstantin-Kachurenko/jquery-popup-dialog) и галереи изображений [$.gallery](https://github.com/Konstantin-Kachurenko/jquery-popup-gallery).

> Требует jQuery 1.7+

## Подключение

Для использования плагина подключите скрипт в любом месте страницы, после подключения библиотеки jQuery. Также, обязательно должны быть подключены стили из файла jquery.popup.css или jquery.popup.min.css, так как именно в них описывается позиционирование диалогов.

    <link rel="stylesheet" href="path/to/script/jquery.popup.min.css" />
    <script src="path/to/script/jquery.popup.min.js"></script>

## Базовый пример

Всплывающий блок с видео

	<style type="text/css">
	
	  /* 
	   * По умолчанию свойство overflow установлено в hidden.
	   * Чтобы иметь возможность вынести .popup-close
	   * за пределы блока, устанавливаем 'overflow: visible'.
	   */
	  #popup-video.popup {
	    overflow: visible;
	    background-color: #1B1B1B;
            box-shadow: 0px 1px 5px 0 rgba( 0, 0, 0, .8 );
	  }
	
	  /* 
	   * Выносим .popup-close за пределы блока
	   */
	  #popup-video.popup .popup-close {
	    position: absolute;
	    z-index: 2;
	    right: -30px;
	    font-size: 1.5em;
	    color: #fff;
	  }
	
	  /* 
	   * Небольшой трюк, чтобы сделать плеер YouTube адаптивным
	   */
	  #popup-video.popup .embed-container { 
	    position: relative; 
	    z-index: 1;
	    padding-bottom: 56.25%; 
	    height: 0; 
	    overflow: hidden; 
	    max-width: 100%; 
	  } 
	  #popup-video.popup .embed-container iframe, 
	  #popup-video.popup .embed-container object, 
	  #popup-video.popup .embed-container embed { 
	    position: absolute; 
	    top: 0; 
	    left: 0; 
	    width: 100%; 
	    height: 100%; 
	  }
	
	</style>
	
	<script>
	
	  $(document).ready(function(){
	
	    // Инициализация плагина
	    $('.popup').popup({
	      close: function(){
	      	// Удаление плеера при закрытии
	        $(this).find('.embed-container').empty();
	      }
	    });
	
	    // Обработка кликов по превью
	    $(document).on('click', '[data-action="watch-video"]', function(e){
	
	      e.preventDefault();
	
	      // Получение доступа к API плагина
	      var plugin = $('#popup-video.popup').data('popup');
	
	      // Создание плеера через <iframe /> 
	      $('#popup-video.popup .embed-container').html(
	        '<iframe src="'
	        + e.currentTarget.href
	        + '?autoplay=1" frameborder="0" allowfullscreen />'
	      );
	
	      // Открытие всплывающего блока
	      plugin.open();
	    });
	
	  });
	
	</script>
	
	<!-- Статичное превью -->
	<a href="https://www.youtube.com/embed/e9al_k8e93I" data-action="watch-video">
	  <img src="images/farcry4.jpg" />
	</a>
	
	<!-- Всплывающий блок -->
	<div class="popup effect-fade-scale" id="popup-video">
	  <div class="embed-container"></div>
	  <!-- 
	  Любой элемент с классом .popup-close внутри диалога
	  будет вызывать его закрытие по клику.
	  //-->
	  <a href="#" class="popup-close">
	    <i class="glyphicon glyphicon-remove"></i>
	  </a>
	</div>

## Параметры инициализации

`Boolean modal = false`

Модальный режим, в котором клик по подложке блока не закрывает его.

`Boolean bubble = true`

"Всплывание" блока вверх по дереву документа. При инициализации с этим параметром, установленным в true, блок будет перемещен в конец \<body\>, не зависимо от того, где он был изначально.

`Function open = Null`

Функция, вызываемая перед отображением всплывающего блока.

`Function close = Null`

Функция, вызываемая перед скрытием всплывающего блока.

`Function realign = Null`

Функция, вызываемая перед установкой свойств `margin-left` и `margin-top` при позиционировании блока.

## API

При инициализации плагина, объект $.popup сохраняется в .data('popup') у каждого из блоков, попавшего в исходный набор. Этот объект предоставляет управление копией плагина и имеет следующий набор свойств методов:

### Свойства

`jQuery $popup`

Всплывающий блок

`jQuery $overlay`

Подложка всплывающего блока

### Методы

`$.popup config([Object params])`

Расширяет набор параметров инициализации, добавляя из объекта `Object params` новые параметры и перезаписывая уже существующие.

`$.popup open()`

Показывает всплывающий блок и его подложку.

`$.popup overlay()`

Показывает только подложку. После вызова этого метода, сам блок по прежнему может быть отображен с помощью метода `open()`

`$.popup close([Number delay])`

Скрывает всплывающий блок. Если числовой параметр `delay` передан и больше 0, закрытие будет отсрочено на переданное количество микросекунд.

`$.popup realign()`

Позиционирует блок так же, как при показе или изменении размеров окна. Полезен при динамическом наполнении блока.

`jQuery destroy()`

Уничтожает копию плагина, возвращая исходный блок.
