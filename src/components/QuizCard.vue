<template>
  <component
    :alt="rootData.alt"
    :is="rootData.is"
    :to="rootData.to" 
    :href="rootData.href" 
    :target="rootData.target"
    :class="[(disabled ? 'no-click' : null),
      'card', 'neo-shadow', 'px-4',
      (compact ? 'card-compact' : null),
      (disabled ? 'card-disabled' : null),
      `card__variant--${variant}`
    ]"
    @click.stop="handleClick"
  >
    <div class="card__content">
      <div class="card--body">
        <div class="card-textuals">
          <h2 class="card-textuals--title">{{title}}</h2>
          <p class="card-textuals--subtitle" v-if="subtitle">{{subtitle}}</p>
        </div>
        <b-badge v-if="badgeText" class="bg-green-600 text-white ml-3" pill>
          {{badgeText}}
        </b-badge>
        <b-icon 
          v-if="icon"
          :icon="icon" 
          :class="`card__icon-variant--${variant}`" 
          scale="1.5" 
          class="mx-2" 
          aria-hidden="true"
        ></b-icon>
      </div>
      <div class="card--footer">
        <b-progress 
          v-if="progressData"
          height="0.4rem" 
          :value="progressData.value" 
          :max="progressData.max" 
          :bg-variant="variant">
        </b-progress>
      </div>
    </div>
  </component>
</template>

<script>
export default {
  name: 'QuizCard',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Title Missing'
    },
    subtitle: {
      type: String,
      default: null
    },
    icon: {
      type: Object,
      default: null
    },
    compact: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'secondary'
    },
    badgeText: {
      type: String,
      default: null
    },
    progressData: {
      type: Object,
      default: null
    },
    link: {
      type: Object,
      default: null
    }
  },
  emits: ['click'],
  computed: {
    elementType() {
      if(!this.link) return null
      return this.link && this.link.to.substr(0,4) === 'http' ? 'a' : 'router-link'
    },
    rootData() {
      return {
        alt: this.link ? this.link.alt : null,
        is: this.link ? this.elementType : 'div',
        to: this.disabled ? '' : (this.elementType === 'router-link' ? this.link.to : null),
        href: this.disabled ? '' : (this.elementType === 'a' ? this.link.to : null),
        target: this.elementType === 'a' ? '_blank' : null,
      }
    }
  },
  methods: {
    /**
     * Emitting first allows disabling of
     * settings before using sound & vibrate
     */
    handleClick(e) {
      this.$emit('click', e)
      this.$store.dispatch('app/playSound', 'click')
      this.$store.dispatch('app/vibrate')
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.no-click,
.no-click * {
  pointer-events: none!important;
  cursor: default;
}

.card{
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  margin: 20px 0;
  width: 100%;
  min-height: 110px;
  border: 1px solid transparent;
  color: var(--color-raisin)
}

.card,
.card:hover,
.card:focus,
.card:active {
  transition: all 0.28s;
}

.card:hover { transform: scale(1.02) }
.card:focus { outline: 0 }
.card-compact { min-height: 70px }

.card__variant--primary:hover { color: var(--primary) }
.card__variant--secondary:hover { color: var(--secondary) }
.card__variant--success:hover { color: var(--success) }
.card__variant--danger:hover { color: var(--danger) }
.card__variant--warning:hover { color: var(--warning) }
.card__variant--info:hover { color: var(--info) }
.card__variant--light:hover { color: var(--light) }
.card__variant--dark:hover { color: var(--dark) }

.card__icon-variant--primary { color: var(--primary) }
.card__icon-variant--secondary { color: var(--secondary) }
.card__icon-variant--success { color: var(--success) }
.card__icon-variant--danger { color: var(--danger) }
.card__icon-variant--warning { color: var(--warning) }
.card__icon-variant--info { color: var(--info) }
.card__icon-variant--light { color: var(--light) }
.card__icon-variant--dark { color: var(--dark) }

.card__content {
  color: inherit;
  margin: auto 0;
}

.card-disabled {
  opacity: 0.5;
}

.card--body {
  display: flex;
  align-items: center;
  padding: 0;
  width: 100%;
  height: 100%;
}

.card-textuals {
  flex-grow: 1;
  padding: 0;
}
.card-textuals--title {
  font-weight: bold;
  color: inherit;
  font-size: 14px;
  margin: 0;
}
.card-textuals--subtitle {
  color: var(--gray);
  margin: 0;
  font-size: 12px;
  margin-top: 5px;
}

.progress {
  box-shadow: inset -1px -1px 12px -12px black;
  margin-top: 16px;
}
</style>
