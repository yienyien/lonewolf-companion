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

    if (!Component.watch) {
      Component.watch = {};
    }
    Component.watch[state] = {
      deep: true,
      handler(v) {
        console.log("ici");
        this.$store.commit(state, v);
      },
    };
  });

  return Component;
}

export { mapState, mapStates, mapper };
