import "./FAQ.css";

function FAQ() {
  return (
    <section className="faq-page">
      <h1>FAQ</h1>

      <div className="faq-block">
        <h2>Является ли тренажёр медицинским изделием?</h2>
        <p>
          Нет. Тренажёр не является медицинским изделием и не подлежит
          медицинской сертификации. Он не предназначен для диагностики,
          лечения или принятия клинических решений.
        </p>
      </div>

      <div className="faq-block">
        <h2>Для чего предназначен тренажёр?</h2>
        <p>
          Тренажёр создан исключительно для обучения и тренировки разметки
          рентгеновских изображений, а также для демонстрации интерфейсов и
          алгоритмов визуализации. Любые результаты носят учебный характер.
        </p>
      </div>

      <div className="faq-block">
        <h2>Можно ли использовать тренажёр для постановки диагноза?</h2>
        <p>
          Нет. Тренажёр не должен использоваться для постановки диагноза,
          выбора лечения или оценки состояния пациента. Для этого необходима
          очная консультация врача.
        </p>
      </div>

      <div className="faq-block">
        <h2>Откуда взяты рентгеновские снимки?</h2>
        <p>
          Все изображения получены из открытых, анонимизированных датасетов,
          разрешённых для исследований и разработки. Примеры:
        </p>
        <ul>
          <li>{" "} <a href = "https://stanfordmlgroup.github.io/competitions/mura/" target="_blank" rel="noreferrer">MURA (Stanford)</a>{" "}</li>
          <li>{" "} <a href = "https://www.kaggle.com/datasets/nih-chest-xrays/data" target="_blank" rel="noreferrer">NIH ChestX-ray14</a>{" "}</li>
          <li>{" "} <a href = "https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia" target="_blank" rel="noreferrer">X-ray Dataset (Kaggle)</a>{" "}</li>
          <li>{" "} <a href = "https://www.kaggle.com/datasets/salmankey/scoliosis-x-ray-dataset-yolov5-format-disks" target="_blank" rel="noreferrer">Scoliosis X-ray Images (Kaggle)</a>{" "}</li>
          <li>{" "} <a href = "https://ru.esotericsoftware.com/spine-player" target="_blank" rel="noreferrer">SpineWeb</a>{" "}</li>
        </ul>
        <p>
          Снимки не содержат персональных данных и не позволяют идентифицировать
          конкретного пациента.
        </p>
      </div>

      <div className="faq-block">
        <h2>Какие патологии представлены и какие коды МКБ‑10 используются?</h2>
        <ul>
          <li>Остеохондроз — M42</li>
          <li>Сколиоз — M41</li>
          <li>Остеопороз — M80–M82</li>
          <li>Норма — без кода МКБ‑10</li>
        </ul>
        <p>
  Официальную классификацию можно посмотреть в{" "}
  <a href="https://mkb-10.com" target="_blank" rel="noreferrer">
    МКБ‑10
  </a>{" "}
  на {" "} <a href = "https://www.who.int/ru" target="_blank" rel="noreferrer">сайте ВОЗ</a>{" "} или национальных регуляторов.
</p>

      </div>

      <div className="faq-block">
        <h2>Есть ли проблемы с юрисдикцией и использованием данных?</h2>
        <p>
          Используемые датасеты являются открытыми и анонимизированными, их
          лицензии допускают использование в исследовательских и учебных
          целях. Тренажёр не обрабатывает персональные данные пациентов и не
          нарушает действующее законодательство.
        </p>
      </div>
    </section>
  );
}

export default FAQ;
