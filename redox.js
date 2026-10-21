(() => {
  const $ = id => document.getElementById(id);
  const state = {
    zn: { volume: 0, cu: 0, zn: 0, metal: false },
    al: { volume: 0, cu: 0, al: 0, metal: false }
  };

  function makeParticles(containerId, cu, product, productLabel) {
    const container = $(containerId);
    if (!container) return;
    container.innerHTML = '';
    const items = [];
    for (let i = 0; i < Math.min(cu, 18); i++) items.push(['Cu²⁺', 'cu-ion']);
    for (let i = 0; i < Math.min(product, 18); i++) items.push([productLabel, 'metal-ion']);
    items.forEach(([label, cls], i) => {
      const dot = document.createElement('span');
      dot.className = `redox-particle ${cls}`;
      dot.textContent = label;
      dot.style.left = `${5 + ((i * 29 + 13) % 86)}%`;
      dot.style.top = `${8 + ((i * 37 + 7) % 78)}%`;
      dot.title = label;
      container.appendChild(dot);
    });
  }

  function renderZn() {
    const s = state.zn;
    $('cuVolume').textContent = `${s.volume} mL`;
    $('cuIonCount').textContent = s.cu;
    $('znIonCount').textContent = s.zn;
    $('znTotalCations').textContent = s.cu + s.zn;
    $('znStatus').textContent = s.volume === 0
      ? '먼저 황산구리 용액을 넣어 보세요.'
      : !s.metal ? '파란색 Cu²⁺ 이온이 생겼어요. 이제 아연을 넣어 보세요.'
      : s.cu === 0 ? '모형 속 Cu²⁺가 모두 반응했어요. Zn²⁺가 용액에 남아 있어요.'
      : '아연이 Cu²⁺와 반응해요. Cu²⁺는 줄고 Zn²⁺는 같은 수만큼 생겨 전체 양이온 수는 같아요.';
    $('znCopperCoat').style.height = `${Math.min(110, s.zn * 8)}px`;
    $('znCopperCoat').style.opacity = s.zn ? '1' : '0';
    makeParticles('znIons', s.cu, s.zn, 'Zn²⁺');
  }

  function renderAl() {
    const s = state.al;
    $('alCuVolume').textContent = `${s.volume} mL`;
    $('alCuIonCount').textContent = s.cu;
    $('alIonCount').textContent = s.al;
    $('alTotalCations').textContent = s.cu + s.al;
    $('alStatus').textContent = s.volume === 0
      ? '먼저 황산구리 용액을 넣어 보세요.'
      : !s.metal ? '파란색 Cu²⁺ 이온이 생겼어요. 이제 알루미늄을 넣어 보세요.'
      : s.cu < 3 ? '반응하려면 Cu²⁺ 이온이 3개씩 필요해요. 용액을 더 넣어 보세요.'
      : '2Al + 3Cu²⁺ → 2Al³⁺ + 3Cu. Cu²⁺ 3개가 줄고 Al³⁺ 2개가 생겨 양이온 수가 1개 줄었어요.';
    makeParticles('alIons', s.cu, s.al, 'Al³⁺');
  }

  function bind(id, handler) {
    const el = $(id);
    if (el) el.addEventListener('click', event => {
      event.preventDefault();
      handler();
    });
  }
  bind('addCuSolution', () => { state.zn.volume = Math.min(100, state.zn.volume + 5); state.zn.cu += 1; renderZn(); });
  bind('addZnMetal', () => {
    const s = state.zn; s.metal = true;
    const reacted = Math.min(s.cu, 1);
    s.cu -= reacted; s.zn += reacted; renderZn();
  });
  bind('resetZn', () => { state.zn.volume = 0; state.zn.cu = 0; state.zn.zn = 0; state.zn.metal = false; renderZn(); });

  bind('addAlCuSolution', () => { state.al.volume = Math.min(100, state.al.volume + 5); state.al.cu += 1; renderAl(); });
  bind('addAlMetal', () => {
    const s = state.al; s.metal = true;
    const groups = Math.floor(s.cu / 3);
    if (groups > 0) { s.cu -= groups * 3; s.al += groups * 2; }
    renderAl();
  });
  bind('resetAl', () => { state.al.volume = 0; state.al.cu = 0; state.al.al = 0; state.al.metal = false; renderAl(); });
  renderZn();
  renderAl();
})();