'use strict';

{
    //必要なデータをhtmlより取り出す
  const timer = document.getElementById('timer')
  const start = document.getElementById('start')
  const stop = document.getElementById('stop')
  const reset = document.getElementById('reset')
  
  let startTime;
  let timeoutId;
  let elapsedTime = 0;
  
  function countUp() {//②カウント方法について定義
      //console.log(Date.now() - startTime);//現在時刻からスタートボタンが押された時刻を引く。
      //最終的にタイマーに値を返すから上記の記述は不要となった。
      const d = new Date(Date.now() - startTime + elapsedTime);//ミリ秒、秒、分、時で表示させるためにdateオブジェクトを作りその中で機能させる。
      //なぜ＋elapsedTimeを入れるかというとストップボタンを押して再度、スタートボタンを押すとstartTimeはその時点から改めてカウントするためDate（Date.now）- starttime = ０になってしまう。そこで経過時間（elapsedTime)を入れれば途中から再開できるようになる。
      const h = d.getUTCHours();//時間を表示。※分、秒、ミリ秒と違いgetの後ろにUTCを入れている理由はgetHoursは現地時刻をとってしまうため。協定世界時のUTCを入れることで解消される。
      const m = d.getMinutes();//分を表示
      const s = d.getSeconds();//秒を表示
      const ms = String(d.getMilliseconds()).padStart(3, '0').slice(0,1);//ミリ秒を表示。そのままだと３桁で表示されるため、padStartで文字列の３桁に変換してからsliceで１文字目だけを抽出。sliceの０は文字列に換算すると１文字目にあたる。padStartを入れなくても同じ結果を得られるが、今回はあえて入れた。
      //③表示されるタイマーに反映されるよう入力。
      timer.textContent = `${h}:${m}:${s}:${ms}`;//htmlでtimerと名前付したものにデータを渡す。

      timeoutId = setTimeout(() => {//どのくらいの頻度でカウントアップの処理を行うか定義付
          countUp();
      },10);//10ミリ秒ごとにカウントアップが機能するようにした。
  }
 　//⑥ボタンが押せるときと押せないときを作る。たとえばストップウォッチが開始しているときにスタートボタンを押せないようにする。
  function setButtonStateInitial(){//Initialは開始前の状態。
      start.disabled = false;//falseが押せる状態
      stop.disabled = true;//trueが押せない状態
      reset.disabled = true;//trueが押せない状態
  }

  function setButtonStateRunning(){//Runningは作動している状態。
      start.disabled = true;//falseが押せる状態
      stop.disabled = false;//trueが押せない状態
      reset.disabled = true;//trueが押せない状態
  }

  function setBunttonStateStopped(){//stopが押されたとき
      start.disabled = false;//falseが押せる状態
      stop.disabled = true;//trueが押せない状態
      reset.disabled = false;//falseが押せない状態
  }

  
  setButtonStateInitial();//何もボタンが押される前の状態。
  

　　//①スタートボタンが押されたときの処理
  start.addEventListener('click',() => {//スタートボタンがクリックされたら
      setButtonStateRunning();//スタートボタンが押された後に押せるボタンを表示
      startTime = Date.now();//現在の時刻を取り出す
      countUp();//時刻をカウントする。カウント方法については②のファンクションで定義
  });

　　//④ストップボタンが押されたときの処理
  stop.addEventListener('click',() => {//ストップボタンがクリックされたら
      setBunttonStateStopped();//ストップボタンが押されたときに押せるボタンを表示。
      clearTimeout(timeoutId);//timeoutIdはsetTimeoutと=でつなげ合わせた。タイマーを機能させているのはsettimeoutだから。
  　　 elapsedTime += Date.now() - startTime;//+=にすることでストップが押されて再度スタートが押されたときに経過時間を足し上げることになるので時間が狂うことがなくなる。
    });
　　//⑤リセットボタンが押されたときの処理
  reset.addEventListener('click',() => {//リセットボタンがクリックされたら
    　setButtonStateInitial();//リセットボタンが押されたときに押せるボタンを表示。
    　timer.textContent = '0:0:0:0';//timer.textContentをはじめの状態で表示させればよい。
　　　 elapsedTime = 0;//リセットボタンが押されたらelapsedTimeも０になるように設定。
  });
  }