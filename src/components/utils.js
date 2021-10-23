function mapState(state) {
  return {
    get() {
      return this.$store.state[state];
    },
    set(v) {
      return this.$store.commit(state, v);
    },
  };
}

function mapStates(...states) {
  const mappings = states.map((state) => [state, mapState(state)]);

  return Object.fromEntries(mappings);
}

function mapper(states, Component) {
  states.forEach((state) => {
    if (!Component.computed) {
      Component.computed = {};
    }
    Component.computed[state] = mapState(state);

    const watch = Component.watch || {};
    let sup = watch[state] && (watch[state].handler || watch[state]);

    watch[state] = {
      deep: true,
      handler(v) {
        this.$store.commit(state, v);
        sup = sup && sup.bind(this);
        sup && sup(v);
      },
    };

    Component.watch = watch;
  });

  return Component;
}

export { mapState, mapStates, mapper };
