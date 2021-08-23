function mapState(state) {
  console.log(state);
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

export { mapState, mapStates };
