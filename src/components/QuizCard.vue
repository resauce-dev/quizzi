<template>
  <component
    :alt="link ? link.alt : null"
    :is="link ? elementType : 'div'"
    :to="elementType === 'router-link' ? link.to : null" 
    :href="elementType === 'a' ? link.to : null" 
    :target="elementType === 'a' ? '_blank' : null"
  >
  <div @click="handleClick" :class="[
      'card', 'neo-shadow', '', 'px-4',
      (compact ? 'card-compact' : null),
      (disabled ? 'card-disabled' : null),
      `card-variant--${variant}`
    ]">
      <div class="card--content">
        <div class="card--body">
          <div class="card-textuals">
            <h2 class="card-textuals--title">{{title}}</h2>
            <p class="card-textuals--subtitle" v-if="subtitle">{{subtitle}}</p>
          </div>
          <b-badge v-if="badgeText" variant="success" class="ml-3" pill>
            {{badgeText}}
          </b-badge>
          <b-icon 
            v-if="icon"
            :icon="icon" 
            :variant="variant" 
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
            :variant="variant">
          </b-progress>
        </div>
      </div>
    </div>
  </component>
</template>

<script>
import vibrate from '@/mixins/vibrate'

export default {
  name: 'QuizCard',
  mixins: [vibrate],
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
      type: String,
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
  computed: {
    elementType() {
      if(!this.link) return null
      return this.link && this.link.to.substr(0,4) === 'http' ? 'a' : 'router-link'
    }
  },
  methods: {
    handleClick(e) {
      this.vibrate()
      this.$emit('click', e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
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

.card-variant--primary:hover { color: var(--primary) }
.card-variant--secondary:hover { color: var(--secondary) }
.card-variant--success:hover { color: var(--success) }
.card-variant--danger:hover { color: var(--danger) }
.card-variant--warning:hover { color: var(--warning) }
.card-variant--info:hover { color: var(--info) }
.card-variant--light:hover { color: var(--light) }
.card-variant--dark:hover { color: var(--dark) }

.card-disabled {
  pointer-events: none;
  opacity: 0.5;
}

.card--content {
  color: inherit;
  margin: auto 0;
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
