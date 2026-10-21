(() => {
  const $ = id => document.getElementById(id);
  const acidType = $('acidType');
  const baseType = $('baseType');
  const acidVolume = $('acidVolume');
  const baseVolume = $('baseVolume');
  const acidValue = $('acidVolumeValue');
  const baseValue = $('baseVolumeValue');
  const particles = $('particles');
  const liquid = $('liquid');
  const status = $('neutralStatus');
  const resultTitle = $('resultTitle');
  const resultDescription = $('resultDescription');
  const hCount = $('hCount');
  const ohCount = $('ohCount');
  const waterCount = $('waterCount');
  const spectatorCount = $('spectatorCount');

  const acidData = {
    HCl: { label: '염산', h: 1, negative: 'Cl⁻' },
    H2SO4: { label: '황산', h: 2, negative: 'SO₄²⁻' }
  };
  const baseData = {
    NaOH: { label: '수산화 나트륨', oh: 1, positive: 'Na⁺' },
    KOH: { label: '수산화 칼륨', oh: 1, positive: 'K⁺' },
    CaOH2: { label: '수산화 칼슘', oh: 2, positive: 'Ca²⁺' }
  };

  function update() {
    const av = Number(acidVolume.value);
    const bv = Number(baseVolume.value);
    acidValue.textContent = `${av} mL`;
    baseValue.textContent = `${bv} mL`;

    // 교육용 간이 모형: mL × 계수로 상대 입자 수를 계산하며, 농도와 용해도 차이는 반영하지 않음.
    const hInitial = Math.round(av / 5) * acidData[acidType.value].h;
    const ohInitial = Math.round(bv / 5) * baseData[baseType.value].oh;
    const reacted = Math.min(hInitial, ohInitial);
    const hRemain = hInitial - reacted;
    const ohRemain = ohInitial - reacted;
    const spectator = Math.round(av / 5) + Math.round(bv / 5);
    const water = reacted;
    const totalVolume = av + bv;
    liquid.style.height = `${Math.max(8, Math.min(95, totalVolume))}%`;
    liquid.style.background = hRemain > 0
      ? 'rgba(244,164,160,.42)'
      : ohRemain > 0
        ? 'rgba(128,189,232,.42)'
        : 'rgba(129,204,181,.48)';

    hCount.textContent = hRemain;
    ohCount.textContent = ohRemain;
    waterCount.textContent = water;
    spectatorCount.textContent = spectator;

    if (av === 0 && bv === 0) {
      resultTitle.textContent = '아직 용액을 넣지 않았어요';
      resultDescription.textContent = '산과 염기를 조금씩 넣어 보세요.';
      status.textContent = '용액을 넣으면 색깔로 입자 종류를 구분해 볼 수 있어요.';
    } else if (hRemain > 0) {
      resultTitle.textContent = '수소 이온이 남아 있어요';
      resultDescription.textContent = '수소 이온이 남아 있는 상태예요. 염기를 더 넣어 관찰해 보세요.';
      status.textContent = '분홍색 H⁺는 아직 물이 되지 않은 수소 이온이에요.';
    } else if (ohRemain > 0) {
      resultTitle.textContent = '수산화 이온이 남아 있어요';
      resultDescription.textContent = '수산화 이온이 남아 있는 상태예요. 산을 더 넣어 관찰해 보세요.';
      status.textContent = '파란색 OH⁻는 아직 물이 되지 않은 수산화 이온이에요.';
    } else {
      resultTitle.textContent = '중화되었어요!';
      resultDescription.textContent = '수소 이온과 수산화 이온이 만나 물이 만들어졌어요.';
      status.textContent = '분홍색 H⁺와 파란색 OH⁻가 만나 물이 되고, 다른 이온은 용액에 남아 있어요.';
    }

    renderParticles({
      h: Math.min(hRemain, 18),
      oh: Math.min(ohRemain, 18),
      positive: Math.min(Math.round(bv / 5), 12),
      negative: Math.min(Math.round(av / 5), 12),
      water: Math.min(water, 16)
    });
  }

  function renderParticles(counts) {
    particles.innerHTML = '';
    const kinds = [
      ['h', counts.h, 'H⁺', 'p-h'],
      ['oh', counts.oh, 'OH⁻', 'p-oh'],
      ['positive', counts.positive, '', 'p-positive'],
      ['negative', counts.negative, '', 'p-negative'],
      ['water', counts.water, 'H₂O', 'p-water']
    ];
    let index = 0;
    kinds.forEach(([kind, count, label, className]) => {
      for (let i = 0; i < count; i++) {
        const node = document.createElement('span');
        node.className = `particle ${className}`;
        node.textContent = label;
        const seed = index * 37 + (kind.length * 13);
        node.style.left = `${4 + ((seed * 17) % 84)}%`;
        node.style.top = `${5 + ((seed * 29) % 82)}%`;
        node.style.animationDelay = `${(index % 8) * -0.24}s`;
        node.title = kind === 'h' ? '수소 이온 H⁺'
          : kind === 'oh' ? '수산화 이온 OH⁻'
          : kind === 'positive' ? '염기에서 온 양이온'
          : kind === 'negative' ? '산에서 온 음이온'
          : '물 H₂O';
        particles.appendChild(node);
        index++;
      }
    });
  }

  [acidType, baseType, acidVolume, baseVolume].forEach(el => el.addEventListener('input', update));
  // 이벤트 위임을 사용해 버튼을 눌렀을 때 확실히 수치와 입자를 갱신해요.
  document.addEventListener('click', event => {
    const acidButton = event.target.closest('[data-add-acid]');
    const baseButton = event.target.closest('[data-add-base]');
    if (acidButton) {
      event.preventDefault();
      acidVolume.value = Math.min(100, Number(acidVolume.value) + Number(acidButton.dataset.addAcid));
      acidVolume.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (baseButton) {
      event.preventDefault();
      baseVolume.value = Math.min(100, Number(baseVolume.value) + Number(baseButton.dataset.addBase));
      baseVolume.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  $('resetNeutral').addEventListener('click', () => {
    acidVolume.value = 0;
    baseVolume.value = 0;
    acidType.value = 'HCl';
    baseType.value = 'NaOH';
    update();
  });
  update();
})();
