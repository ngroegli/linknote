# LinkNote Examples

This document contains example Markdown you can use to test LinkNote.

---

## Example 1: Simple Note

```markdown
# My Meeting Notes

**Date:** January 18, 2026
**Attendees:** Alice, Bob, Charlie

## Agenda
1. Project updates
2. Q1 planning
3. Action items

## Discussion Points
- Discussed new feature proposals
- Reviewed timeline
- Assigned tasks

## Action Items
- [ ] Alice: Draft specification
- [ ] Bob: Review security implications
- [ ] Charlie: Prepare cost estimates

## Next Meeting
*February 1, 2026 at 10:00 AM*
```

---

## Example 2: Technical Documentation

```markdown
# API Endpoint Documentation

## `GET /api/users`

Retrieves a list of all users.

### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 10) |
| `sort` | string | No | Sort field (default: "name") |

### Response

```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  ],
  "total": 1,
  "page": 1
}
```

### Error Codes

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `500` - Server Error
```

---

## Example 3: Project README

```markdown
# My Awesome Project

> A brief description of what your project does

## Features

✨ **Key Features:**
- Fast and lightweight
- Easy to use
- Well documented
- Open source

## Installation

```bash
git clone https://github.com/username/project.git
cd project
npm install
```

## Usage

```javascript
const awesome = require('awesome-project');

awesome.doSomething({
  option: 'value'
});
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## License

MIT © 2026 Your Name
```

---

## Example 4: Study Notes

```markdown
# Computer Science 101 - Lecture 5

**Topic:** Data Structures
**Date:** January 15, 2026

## Arrays

**Definition:** Contiguous block of memory storing elements of the same type.

**Characteristics:**
- Fixed size
- O(1) access time
- O(n) insertion/deletion

**Code Example:**
```python
# Python array
numbers = [1, 2, 3, 4, 5]
print(numbers[0])  # Output: 1
```

## Linked Lists

**Definition:** Collection of nodes, each containing data and reference to next node.

**Advantages:**
- Dynamic size
- Efficient insertion/deletion

**Disadvantages:**
- O(n) access time
- Extra memory for pointers

## Key Takeaways

> "Choose the right data structure for your use case."

- Arrays for random access
- Linked lists for frequent insertions
- Consider time/space tradeoffs
```

---

## Example 5: Blog Post Draft

```markdown
# 5 Tips for Better Productivity

*Published: January 18, 2026*

---

Working from home can be challenging. Here are my top 5 tips for staying productive.

## 1. 🌅 Start Early

The early morning hours are often the most productive. Try waking up 30 minutes earlier.

**Benefits:**
- Fewer distractions
- Mental clarity
- Sense of accomplishment

## 2. 📝 Write Everything Down

Don't rely on memory alone.

> "Your mind is for having ideas, not holding them." - David Allen

Use tools like:
- LinkNote for quick thoughts
- Trello for project management
- Google Calendar for scheduling

## 3. ⏰ Time Blocking

Dedicate specific blocks of time to specific tasks.

**Example Schedule:**
- 9:00 - 11:00: Deep work
- 11:00 - 12:00: Meetings
- 12:00 - 1:00: Lunch
- 1:00 - 3:00: Collaborative work
- 3:00 - 5:00: Admin tasks

## 4. 🚫 Minimize Distractions

Turn off notifications during focus time.

**Tools that help:**
- Forest app
- Freedom
- Cold Turkey

## 5. 🎯 Set Clear Goals

Know what you want to accomplish.

**SMART Goals:**
- **S**pecific
- **M**easurable
- **A**chievable
- **R**elevant
- **T**ime-bound

---

## Conclusion

Productivity is personal. Find what works for you and stick with it!

*What are your productivity tips? Let me know in the comments!*
```

---

## Tips for Using These Examples

1. **Copy an example** from above
2. **Paste into LinkNote** editor
3. **See the preview** update in real-time
4. **Modify to your needs**
5. **Copy the URL** to save your work

---

## More Markdown Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

---

<p align="center">
  <strong>Happy writing! 📝</strong>
</p>
