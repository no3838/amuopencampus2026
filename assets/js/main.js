(() => {
  "use strict";

  const config = window.OC_CONFIG || {};
  const videoData = window.OC_VIDEO_DATA || {};
  const body = document.body;
  const assetRoot = body.dataset.assetRoot || "";
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");
  const heroVideo = document.querySelector("[data-hero-video]");
  const videoControl = document.querySelector("[data-video-control]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let userPaused = reduceMotion.matches;

  document.querySelectorAll("[data-config-text]").forEach((element) => {
    const key = element.dataset.configText;
    if (typeof config[key] === "string") element.textContent = config[key];
  });

  document.querySelectorAll("[data-config-href]").forEach((element) => {
    const key = element.dataset.configHref;
    if (typeof config[key] === "string") element.href = config[key];
  });

  if (config.status) body.dataset.eventStatus = config.status;

  const eventYear = typeof config.eventYear === "string" ? config.eventYear : "次年度";
  const applicationStates = {
    open: {
      enabled: true,
      label: "申込受付中",
      message: "参加登録・イベント予約へお進みください。"
    },
    upcoming: {
      enabled: false,
      label: "受付開始前",
      message: "参加申込受付の開始までお待ちください。"
    },
    ended: {
      enabled: false,
      label: `${eventYear}年度 受付終了`,
      message: `${eventYear}年度の参加申込受付は終了しました。`
    }
  };
  document.querySelectorAll("[data-application-link]").forEach((link) => {
    const stateKey = link.dataset.applicationStateKey;
    const labelKey = link.dataset.applicationLabelKey;
    const messageKey = link.dataset.applicationMessageKey;
    const linkStatus = stateKey && typeof config[stateKey] === "string" ? config[stateKey] : config.status;
    const applicationState = applicationStates[linkStatus] || applicationStates.upcoming;
    const applicationLabel = labelKey && typeof config[labelKey] === "string" ? config[labelKey] : applicationState.label;
    const applicationMessage = messageKey && typeof config[messageKey] === "string" ? config[messageKey] : applicationState.message;
    const status = link.querySelector("[data-application-status]");
    const message = link.querySelector("[data-application-message]");
    if (status) status.textContent = applicationLabel;
    if (message) message.textContent = applicationMessage;

    link.classList.toggle("is-disabled", !applicationState.enabled);
    if (applicationState.enabled) {
      link.removeAttribute("aria-disabled");
      link.removeAttribute("tabindex");
    } else {
      link.setAttribute("aria-disabled", "true");
      link.setAttribute("tabindex", "-1");
      link.addEventListener("click", (event) => event.preventDefault());
    }
  });

  const setHeaderState = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 18);
  };
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const closeMenu = () => {
    if (!menuButton || !menu) return;
    menuButton.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    body.classList.remove("menu-open");
  };

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const willOpen = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(willOpen));
      menu.classList.toggle("is-open", willOpen);
      body.classList.toggle("menu-open", willOpen);
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const updateVideoControl = () => {
    if (!videoControl) return;
    videoControl.setAttribute("aria-pressed", String(userPaused));
    const icon = videoControl.querySelector(".video-control-icon");
    const label = videoControl.querySelector("[data-video-control-label]");
    if (icon) icon.textContent = userPaused ? "▶" : "Ⅱ";
    if (label) label.textContent = userPaused ? "動画を再生" : "動画を一時停止";
  };

  const requestPlayback = async () => {
    if (!heroVideo || userPaused) return;
    heroVideo.muted = true;
    try {
      await heroVideo.play();
      body.classList.add("video-playing");
    } catch (_error) {
      body.classList.remove("video-playing");
    }
  };

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.loop = true;
    heroVideo.playsInline = true;

    const markVideoReady = () => body.classList.add("video-ready");
    if (heroVideo.readyState >= 2) markVideoReady();
    heroVideo.addEventListener("loadeddata", markVideoReady, { once: true });
    heroVideo.addEventListener("canplay", markVideoReady, { once: true });
    heroVideo.addEventListener("error", () => body.classList.add("video-error"), { once: true });

    if (reduceMotion.matches) {
      heroVideo.pause();
    } else {
      requestPlayback();
      window.addEventListener("load", requestPlayback, { once: true });
    }
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) requestPlayback();
    });
  }

  if (videoControl && heroVideo) {
    updateVideoControl();
    videoControl.addEventListener("click", () => {
      userPaused = !userPaused;
      if (userPaused) {
        heroVideo.pause();
        body.classList.remove("video-playing");
      } else {
        requestPlayback();
      }
      updateVideoControl();
    });
  }

  const shuffle = (items) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const createVideoCard = (video, compact = false) => {
    const link = document.createElement("a");
    link.className = compact ? "movie-card movie-card--compact" : "movie-card";
    link.href = `https://youtu.be/${video.id}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${video.title}をYouTubeで再生`);

    const media = document.createElement("span");
    media.className = "movie-card__media";
    const image = document.createElement("img");
    image.src = `${assetRoot}${video.thumbnail}`;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    const play = document.createElement("span");
    play.className = "movie-card__play";
    play.setAttribute("aria-hidden", "true");
    play.textContent = "▶";
    media.append(image, play);

    const text = document.createElement("span");
    text.className = "movie-card__title";
    text.textContent = video.title;
    link.append(media, text);
    return link;
  };

  document.querySelectorAll("[data-video-rail]").forEach((rail) => {
    const category = rail.dataset.videoRail;
    const shuffledItems = shuffle(videoData[category] || []);
    if (!shuffledItems.length) return;
    const items = [...shuffledItems];
    while (items.length < 4) {
      items.push(...shuffledItems.slice(0, 4 - items.length));
    }

    const track = rail.querySelector(".video-rail__track");
    if (!track) return;

    const buildSet = (duplicate = false) => {
      const set = document.createElement("div");
      set.className = "video-rail__set";
      if (duplicate) set.setAttribute("aria-hidden", "true");
      items.forEach((video) => {
        const card = createVideoCard(video, true);
        if (duplicate) card.tabIndex = -1;
        set.append(card);
      });
      return set;
    };

    track.append(buildSet(false));
    if (!reduceMotion.matches) {
      track.append(buildSet(true));
      track.style.setProperty("--rail-duration", `${Math.max(34, items.length * 8)}s`);
    }
  });

  document.querySelectorAll("[data-video-group]").forEach((container) => {
    const category = container.dataset.videoGroup;
    const group = container.dataset.group;
    const items = (videoData[category] || []).filter((video) => !group || video.group === group);
    items.forEach((video) => container.append(createVideoCard(video)));
  });

  document.querySelectorAll("[data-photo-rail]").forEach((rail) => {
    const track = rail.querySelector("[data-photo-track]");
    const photos = track ? [...track.querySelectorAll(".report-photo")] : [];
    const previous = rail.querySelector("[data-photo-prev]");
    const next = rail.querySelector("[data-photo-next]");
    const counter = rail.querySelector("[data-photo-counter]");
    if (!track || photos.length < 2 || !previous || !next || !counter) return;

    let currentIndex = 0;
    let updateQueued = false;

    const updatePhotoRail = () => {
      const trackLeft = track.getBoundingClientRect().left;
      currentIndex = photos.reduce((closestIndex, photo, index) => {
        const distance = Math.abs(photo.getBoundingClientRect().left - trackLeft);
        const closestDistance = Math.abs(photos[closestIndex].getBoundingClientRect().left - trackLeft);
        return distance < closestDistance ? index : closestIndex;
      }, 0);
      counter.textContent = `${currentIndex + 1} / ${photos.length}`;
      previous.disabled = currentIndex === 0;
      next.disabled = currentIndex === photos.length - 1;
      updateQueued = false;
    };

    const moveToPhoto = (index) => {
      const targetIndex = Math.max(0, Math.min(photos.length - 1, index));
      const left = photos[targetIndex].offsetLeft - photos[0].offsetLeft;
      track.scrollTo({ left, behavior: reduceMotion.matches ? "auto" : "smooth" });
    };

    previous.addEventListener("click", () => moveToPhoto(currentIndex - 1));
    next.addEventListener("click", () => moveToPhoto(currentIndex + 1));
    track.addEventListener("scroll", () => {
      if (updateQueued) return;
      updateQueued = true;
      window.requestAnimationFrame(updatePhotoRail);
    }, { passive: true });
    window.addEventListener("resize", updatePhotoRail, { passive: true });
    updatePhotoRail();
  });
})();
